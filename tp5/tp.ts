interface IMessage {
  process(): string;
}

class Message implements IMessage {
  constructor(private content: string) {}

  process(): string {
    return this.content;
  }
}

abstract class MessageDecorator implements IMessage {
  constructor(protected message: IMessage) {}

  abstract process(): string;
}

class CompressDecorator extends MessageDecorator {
  process(): string {
    return `[COMPRESSED: ${this.message.process()}]`;
  }
}

class EncryptDecorator extends MessageDecorator {
  process(): string {
    return `[ENCRYPTED: ${this.message.process()}]`;
  }
}

class SignDecorator extends MessageDecorator {
  process(): string {
    return `[SIGNED: ${this.message.process()}]`;
  }
}

class LogDecorator extends MessageDecorator {
  process(): string {
    return `[LOGGED: ${this.message.process()}]`;
  }
}

function main(): void {
  const msg1 = new Message("Hello");
  console.log(msg1.process());

  const msg2 = new CompressDecorator(new Message("Hello"));
  console.log(msg2.process());

  const msg3 = new EncryptDecorator(
    new CompressDecorator(new Message("Secret")),
  );
  console.log(msg3.process());

  const msg4 = new CompressDecorator(
    new EncryptDecorator(new Message("Secret")),
  );
  console.log(msg4.process());

  const msg5 = new SignDecorator(
    new EncryptDecorator(new CompressDecorator(new Message("Data"))),
  );
  console.log(msg5.process());

  const msg6 = new LogDecorator(
    new SignDecorator(
      new EncryptDecorator(new CompressDecorator(new Message("Top Secret"))),
    ),
  );
  console.log(msg6.process());
}

main();
