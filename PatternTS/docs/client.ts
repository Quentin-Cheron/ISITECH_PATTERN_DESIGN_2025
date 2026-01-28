abstract class Commande {
  abstract afficher(): void;
}

class CommandeCredit extends Commande {
  afficher(): void {
    console.log("Commande à crédit");
  }
}

class CommandeComptant extends Commande {
  afficher(): void {
    console.log("Commande au comptant");
  }
}

abstract class Client {
  protected commande: Array<Commande>;
  protected name: string;

  constructor(name: string) {
    this.commande = [];
    this.name = name;
  }

  abstract creeCommande(): void;
  abstract afficher(): void;
}

class ClientComptant extends Client {
  creeCommande() {
    this.commande.push(new CommandeComptant());
  }

  afficher(): void {
    const message = `Client ${this.name} a ${this.commande.length} commandes`;
    console.log(message);
  }
}

class ClientCredit extends Client {
  creeCommande() {
    this.commande.push(new CommandeCredit());
  }

  afficher(): void {
    const message = `Client ${this.name} a ${this.commande.length} commandes`;
    console.log(message);
  }
}

const clientComptant = new ClientComptant("Alice");
clientComptant.creeCommande();

const clientCredit = new ClientCredit("Bob");
clientCredit.creeCommande();
