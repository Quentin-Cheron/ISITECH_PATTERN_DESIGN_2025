// ============================================
// UTILITAIRES
// ============================================

const generateGuid = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// ============================================
// SOUS-SYSTÈMES EXISTANTS
// ============================================

class InventoryService {
  constructor() {
    console.log("InventoryService: Connexion à la base de données...");
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

interface IPaymentService {
  processPayment(customerId: string, amount: number): boolean;
  refundPayment(transactionId: string): void;
}

class PaymentServiceProxy implements IPaymentService {
  private realPaymentService: PaymentService | null = null;
  private userRole: string;

  constructor(userRole: string) {
    this.userRole = userRole;
    console.log(`PaymentServiceProxy: Créé pour le rôle '${userRole}'`);
  }

  private getRealService(): PaymentService {
    if (!this.realPaymentService) {
      console.log("PaymentServiceProxy: Initialisation lazy du service réel");
      this.realPaymentService = new PaymentService();
    }
    return this.realPaymentService;
  }

  private checkAccess(operation: string): boolean {
    console.log(
      `PaymentServiceProxy: Vérification des droits pour '${operation}'`,
    );
    if (this.userRole === "admin" || this.userRole === "customer") {
      console.log("PaymentServiceProxy: Accès autorisé");
      return true;
    }
    console.log("PaymentServiceProxy: Accès refusé");
    return false;
  }

  processPayment(customerId: string, amount: number): boolean {
    if (!this.checkAccess("processPayment")) {
      console.log("❌ Opération refusée: droits insuffisants");
      return false;
    }
    return this.getRealService().processPayment(customerId, amount);
  }

  refundPayment(transactionId: string): void {
    if (!this.checkAccess("refundPayment")) {
      console.log("❌ Opération refusée: droits insuffisants");
      return;
    }
    this.getRealService().refundPayment(transactionId);
  }
}

interface OrderDetails {
  productId: string;
  customerId: string;
  amount: number;
  quantity: number;
  shippingAddress: string;
  customerEmail: string;
}

interface OrderResult {
  success: boolean;
  orderId?: string;
  trackingNumber?: string;
  message: string;
}

class EcommerceFacade {
  private inventoryService: InventoryService | null = null;
  private paymentServiceProxy: PaymentServiceProxy;
  private shippingService: ShippingService | null = null;
  private notificationService: NotificationService | null = null;
  private loyaltyService: LoyaltyService | null = null;

  constructor(userRole: string = "customer") {
    console.log(
      `\n🏗️  EcommerceFacade: Initialisation pour rôle '${userRole}'`,
    );
    this.paymentServiceProxy = new PaymentServiceProxy(userRole);
  }

  private getInventoryService(): InventoryService {
    if (!this.inventoryService) {
      console.log("EcommerceFacade: Chargement lazy de InventoryService");
      this.inventoryService = new InventoryService();
    }
    return this.inventoryService;
  }

  private getShippingService(): ShippingService {
    if (!this.shippingService) {
      console.log("EcommerceFacade: Chargement lazy de ShippingService");
      this.shippingService = new ShippingService();
    }
    return this.shippingService;
  }

  private getNotificationService(): NotificationService {
    if (!this.notificationService) {
      console.log("EcommerceFacade: Chargement lazy de NotificationService");
      this.notificationService = new NotificationService();
    }
    return this.notificationService;
  }

  private getLoyaltyService(): LoyaltyService {
    if (!this.loyaltyService) {
      console.log("EcommerceFacade: Chargement lazy de LoyaltyService");
      this.loyaltyService = new LoyaltyService();
    }
    return this.loyaltyService;
  }

  placeOrder(orderDetails: OrderDetails): OrderResult {
    console.log("\n🛍️  Traitement de la commande via la Facade...\n");

    const {
      productId,
      customerId,
      amount,
      quantity,
      shippingAddress,
      customerEmail,
    } = orderDetails;

    try {
      const inventory = this.getInventoryService();
      if (!inventory.checkStock(productId, quantity)) {
        return { success: false, message: "Stock insuffisant" };
      }

      inventory.reserveStock(productId, quantity);

      if (!this.paymentServiceProxy.processPayment(customerId, amount)) {
        return { success: false, message: "Échec du paiement" };
      }

      const orderId = generateGuid();
      const shipping = this.getShippingService();
      const trackingNumber = shipping.createShipment(orderId, shippingAddress);

      const notification = this.getNotificationService();
      notification.sendEmail(
        customerEmail,
        "Commande confirmée",
        `Votre commande ${orderId} a été confirmée. Suivi: ${trackingNumber}`,
      );

      const loyalty = this.getLoyaltyService();
      const points = Math.floor(amount * 10);
      loyalty.addPoints(customerId, points);

      return {
        success: true,
        orderId,
        trackingNumber,
        message: "Commande traitée avec succès",
      };
    } catch (error) {
      return {
        success: false,
        message: `Erreur: ${error}`,
      };
    }
  }

  cancelOrder(orderId: string, transactionId: string): void {
    this.paymentServiceProxy.refundPayment(transactionId);

    const notification = this.getNotificationService();
    notification.sendEmail(
      "client@example.com",
      "Commande annulée",
      `Votre commande ${orderId} a été annulée et remboursée.`,
    );
  }
}

function main(): void {
  const facade1 = new EcommerceFacade("customer");

  const result1 = facade1.placeOrder({
    productId: "PROD-001",
    customerId: "CUST-123",
    amount: 99.99,
    quantity: 1,
    shippingAddress: "123 rue Example",
    customerEmail: "client@example.com",
  });

  if (result1.success) {
    console.log(`📦 Numéro de suivi: ${result1.trackingNumber}`);
  }

  const facade2 = new EcommerceFacade("guest");

  const result2 = facade2.placeOrder({
    productId: "PROD-002",
    customerId: "CUST-456",
    amount: 49.99,
    quantity: 1,
    shippingAddress: "456 avenue Test",
    customerEmail: "guest@example.com",
  });

  const facade3 = new EcommerceFacade("admin");

  const result3 = facade3.placeOrder({
    productId: "PROD-003",
    customerId: "CUST-789",
    amount: 199.99,
    quantity: 2,
    shippingAddress: "789 boulevard Admin",
    customerEmail: "admin@example.com",
  });

  if (result3.success) {
    facade3.cancelOrder(result3.orderId!, "TXN-12345");
  }
}
