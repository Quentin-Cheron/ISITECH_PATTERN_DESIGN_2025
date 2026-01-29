// VERSION INCORRECTE

class NotificationServiceIncorrect {
  public sendNotification(
    message: string,
    type: string,
    recipient: string,
  ): void {
    if (type === "email") {
      console.log("Connexion au serveur SMTP...");
      console.log(`Envoi email à ${recipient}: ${message}`);
      console.log("Déconnexion SMTP");
    } else if (type === "sms") {
      console.log("Connexion API SMS...");
      console.log(`Envoi SMS à ${recipient}: ${message}`);
      console.log("Déconnexion API");
    } else if (type === "push") {
      console.log("Connexion Firebase...");
      console.log(`Envoi push à ${recipient}: ${message}`);
      console.log("Déconnexion Firebase");
    } else if (type === "slack") {
      console.log("Connexion Slack API...");
      console.log(`Envoi Slack à ${recipient}: ${message}`);
      console.log("Déconnexion Slack");
    }
  }
}

const serviceIncorrect = new NotificationServiceIncorrect();
serviceIncorrect.sendNotification(
  "Commande prête",
  "email",
  "client@example.com",
);
serviceIncorrect.sendNotification("Code: 1234", "sms", "+33612345678");

console.log("\n" + "=".repeat(50) + "\n");

// VERSION CORRECTE

interface INotificationStrategy {
  send(message: string, recipient: string): void;
}

class EmailNotificationStrategy implements INotificationStrategy {
  public send(message: string, recipient: string): void {
    console.log("Connexion au serveur SMTP...");
    console.log(`📧 Envoi email à ${recipient}: ${message}`);
    console.log("Déconnexion SMTP");
  }
}

class SmsNotificationStrategy implements INotificationStrategy {
  public send(message: string, recipient: string): void {
    console.log("Connexion API SMS...");
    console.log(`📱 Envoi SMS à ${recipient}: ${message}`);
    console.log("Déconnexion API");
  }
}

class PushNotificationStrategy implements INotificationStrategy {
  public send(message: string, recipient: string): void {
    console.log("Connexion Firebase...");
    console.log(`🔔 Envoi push à ${recipient}: ${message}`);
    console.log("Déconnexion Firebase");
  }
}

class SlackNotificationStrategy implements INotificationStrategy {
  public send(message: string, recipient: string): void {
    console.log("Connexion Slack API...");
    console.log(`💬 Envoi Slack à ${recipient}: ${message}`);
    console.log("Déconnexion Slack");
  }
}

class NotificationService {
  private strategy: INotificationStrategy;

  constructor(strategy: INotificationStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: INotificationStrategy): void {
    this.strategy = strategy;
  }

  public sendNotification(message: string, recipient: string): void {
    this.strategy.send(message, recipient);
  }
}

// DÉMONSTRATION

const emailService = new NotificationService(new EmailNotificationStrategy());
emailService.sendNotification("Votre commande est prête", "client@example.com");

const smsService = new NotificationService(new SmsNotificationStrategy());
smsService.sendNotification("Code: 1234", "+33612345678");

const notifService = new NotificationService(new PushNotificationStrategy());
notifService.sendNotification("Nouvelle notification!", "user123");

notifService.setStrategy(new SlackNotificationStrategy());
notifService.sendNotification("Meeting dans 10 min", "#general");
