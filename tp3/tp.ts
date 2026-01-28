// // Code existant problématique

// class NotificationCommande {
//   envoyerParEmail(message: string): void {
//     console.log(`Email - Commande: ${message}`);
//   }

//   envoyerParSMS(message: string): void {
//     console.log(`SMS - Commande: ${message}`);
//   }

//   envoyerParPush(message: string): void {
//     console.log(`Push - Commande: ${message}`);
//   }
// }

// class NotificationLivraison {
//   envoyerParEmail(message: string): void {
//     console.log(`Email - Livraison: ${message}`);
//   }

//   envoyerParSMS(message: string): void {
//     console.log(`SMS - Livraison: ${message}`);
//   }

//   envoyerParPush(message: string): void {
//     console.log(`Push - Livraison: ${message}`);
//   }
// }

// class NotificationSupport {
//   envoyerParEmail(message: string): void {
//     console.log(`Email - Support: ${message}`);
//   }

//   envoyerParSMS(message: string): void {
//     console.log(`SMS - Support: ${message}`);
//   }

//   envoyerParPush(message: string): void {
//     console.log(`Push - Support: ${message}`);
//   }
// }

// // Utilisation
// function main(): void {
//   const notifCommande = new NotificationCommande();
//   notifCommande.envoyerParEmail("Votre commande est confirmée");

//   const notifLivraison = new NotificationLivraison();
//   notifLivraison.envoyerParSMS("Votre colis est en route");

//   const notifSupport = new NotificationSupport();
//   notifSupport.envoyerParPush("Un agent va vous contacter");
// }

// main();

// Nouveau Code sans erreurs

class EmailSender {
  envoyer(message: string): void {
    console.log(`Email : ${message}`);
  }
}

class SmsSender {
  envoyer(message: string): void {
    console.log(`SMS : ${message}`);
  }
}

class PushSender {
  envoyer(message: string): void {
    console.log(`Push : ${message}`);
  }
}

interface CanalEnvoi {
  envoyer(message: string): void;
}

class NotificationSupport {
  private canal: CanalEnvoi;

  constructor(canal: CanalEnvoi) {
    this.canal = canal;
  }

  envoyer(message: string) {
    this.canal.envoyer(`[COMMANDE] ${message}`);
  }
}

class NotificationLivraison {
  private canal: CanalEnvoi;

  constructor(canal: CanalEnvoi) {
    this.canal = canal;
  }

  envoyer(message: string) {
    this.canal.envoyer(`[LIVRAISON] ${message}`);
  }
}

class NotificationCommande {
  private canal: CanalEnvoi;

  constructor(canal: CanalEnvoi) {
    this.canal = canal;
  }

  envoyer(message: string) {
    this.canal.envoyer(`[COMMANDE] ${message}`);
  }
}

const notifCommande = new NotificationCommande(new EmailSender());

notifCommande.envoyer("Votre commande est confirmée");

const notifLivraison = new NotificationLivraison(new SmsSender());

notifLivraison.envoyer("Votre colis est en route");

const notifSupport = new NotificationSupport(new PushSender());

notifSupport.envoyer("Un agent va vous contacter");
