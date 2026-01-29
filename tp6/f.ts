// ============================================
// UTILITAIRE
// ============================================

const generateGuid = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// ============================================
// Sous-systèmes existants (complexité cachée)
// ============================================

class InventoryService {
  constructor() {
    // Simulation d'une initialisation coûteuse
    console.log("InventoryService: Connexion à la base de données...");
    // Note: Thread.Sleep n'existe pas en TypeScript (utiliser async/await en production)
    console.log("InventoryService: Prêt");
  }

  checkStock(productId: string, quantity: number): boolean {
    console.log(`InventoryService: Vérification stock pour ${productId}`);
    return true;
  }

  reserveStock(productId: string, quantity: number): void {
    console.log(`InventoryService: Réservation de ${quantity} x ${productId}`);
  }
}

class PaymentService {
  constructor() {
    console.log("PaymentService: Établissement connexion sécurisée...");
    console.log("PaymentService: Prêt");
  }

  processPayment(customerId: string, amount: number): boolean {
    console.log(
      `PaymentService: Traitement paiement de ${amount}€ pour ${customerId}`,
    );
    return true;
  }

  refundPayment(transactionId: string): void {
    console.log(`PaymentService: Remboursement ${transactionId}`);
  }
}

class ShippingService {
  createShipment(orderId: string, address: string): string {
    console.log(
      `ShippingService: Création expédition pour commande ${orderId}`,
    );
    return "TRACK-" + generateGuid().substring(0, 8);
  }
}

class NotificationService {
  sendEmail(email: string, subject: string, body: string): void {
    console.log(`NotificationService: Email envoyé à ${email}`);
  }

  sendSMS(phone: string, message: string): void {
    console.log(`NotificationService: SMS envoyé à ${phone}`);
  }
}

class LoyaltyService {
  addPoints(customerId: string, points: number): void {
    console.log(`LoyaltyService: +${points} points pour ${customerId}`);
  }

  getPoints(customerId: string): number {
    return 150;
  }
}

function main(): void {
  // Le client doit connaître et coordonner tous les services
  const inventory = new InventoryService();
  const payment = new PaymentService();
  const shipping = new ShippingService();
  const notification = new NotificationService();
  const loyalty = new LoyaltyService();

  const productId = "PROD-001";
  const customerId = "CUST-123";
  const amount = 99.99;

  if (inventory.checkStock(productId, 1)) {
    inventory.reserveStock(productId, 1);

    if (payment.processPayment(customerId, amount)) {
      const orderId = generateGuid();
      const trackingNumber = shipping.createShipment(
        orderId,
        "123 rue Example",
      );
      notification.sendEmail(
        "client@example.com",
        "Commande confirmée",
        `Tracking: ${trackingNumber}`,
      );
      loyalty.addPoints(customerId, Math.floor(amount * 10));
    }
  }

  console.log("\nProblèmes :");
  console.log("1. Code client complexe et verbeux");
  console.log("2. Forte dépendance vers tous les services");
  console.log("3. Services initialisés même si pas nécessaires");
  console.log("4. Pas de contrôle d'accès");
}

main();
