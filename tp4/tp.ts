interface IPaymentService {
  ProcessPayment(amount: number, currency: string): boolean;
  RefundPayment(transactionId: string, amount: number): boolean;
  GetTransactionStatus(transactionId: string): string;
}

class InternalPaymentService implements IPaymentService {
  ProcessPayment(amount: number, currency: string): boolean {
    console.log(`Paiement interne: ${amount} ${currency}`);
    return true;
  }

  RefundPayment(transactionId: string, amount: number): boolean {
    console.log(`Remboursement interne: ${transactionId} - ${amount}`);
    return true;
  }

  GetTransactionStatus(transactionId: string): string {
    return "Completed";
  }
}

class PaymentPro {
  // Exécute une transaction avec code devise numérique
  ExecuterTransaction(montant: number, codeDevise: number): string {
    console.log(
      `PaymentPro: Transaction de ${montant} avec devise code ${codeDevise}`,
    );
    return this.generateId();
  }

  // Annule complètement une transaction
  AnnulerTransaction(reference: string): boolean {
    console.log(`PaymentPro: Annulation de ${reference}`);
    return true;
  }

  // Retourne un code numérique : 0=En cours, 1=Validé, 2=Échoué
  ObtenirEtat(reference: string): number {
    return 1;
  }

  private generateId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }
}

class PaymentProAdapter implements IPaymentService {
  private paymentPro: PaymentPro;
  private lastTransactionId: string = "";

  private currencyMap: Map<string, number> = new Map([
    ["EUR", 1],
    ["USD", 2],
    ["GBP", 3],
  ]);

  constructor(paymentPro: PaymentPro) {
    this.paymentPro = paymentPro;
  }

  ProcessPayment(amount: number, currency: string): boolean {
    console.log(
      `[ADAPTER] Conversion de ProcessPayment vers ExecuterTransaction`,
    );

    const codeDevise = this.convertCurrencyStringToCode(currency);
    console.log(`Devise: "${currency}" code ${codeDevise}`);

    const transactionId = this.paymentPro.ExecuterTransaction(
      amount,
      codeDevise,
    );

    this.lastTransactionId = transactionId;

    const success = transactionId.length > 0;
    console.log(
      `Résultat: ID="${transactionId.substring(0, 8)}..." success=${success}`,
    );

    return success;
  }

  RefundPayment(transactionId: string, amount: number): boolean {
    console.log(
      `[ADAPTER] Conversion de RefundPayment vers AnnulerTransaction`,
    );
    console.log(`Transaction: ${transactionId}`);
    console.log(
      `Montant demandé: ${amount} (ignoré par PaymentPro - annulation complète)`,
    );

    const result = this.paymentPro.AnnulerTransaction(transactionId);

    console.log(`   └─ Résultat: ${result}\n`);
    return result;
  }

  GetTransactionStatus(transactionId: string): string {
    console.log(
      `[ADAPTER] Conversion de GetTransactionStatus vers ObtenirEtat`,
    );

    const statusCode = this.paymentPro.ObtenirEtat(transactionId);

    const statusString = this.convertStatusCodeToString(statusCode);

    console.log(`   ├─ Code PaymentPro: ${statusCode}`);
    console.log(`   └─ Statut IPaymentService: "${statusString}"\n`);

    return statusString;
  }

  private convertCurrencyStringToCode(currency: string): number {
    const code = this.currencyMap.get(currency.toUpperCase());

    if (code === undefined) {
      console.warn(
        `Devise "${currency}" non supportée, utilisation de EUR par défaut`,
      );
      return 1; // EUR par défaut
    }

    return code;
  }

  private convertStatusCodeToString(statusCode: number): string {
    switch (statusCode) {
      case 0:
        return "Pending";
      case 1:
        return "Completed";
      case 2:
        return "Failed";
      default:
        return "Unknown";
    }
  }

  getLastTransactionId(): string {
    return this.lastTransactionId;
  }
}

function ProcessOrder(paymentService: IPaymentService, total: number): void {
  console.log(`📦 Traitement d'une commande de ${total} EUR`);
  const success = paymentService.ProcessPayment(total, "EUR");
  if (success) {
    console.log("Commande traitée avec succès");
  } else {
    console.log("❌ Échec du traitement de la commande");
  }
}

function Main(): void {
  const internalService = new InternalPaymentService();
  ProcessOrder(internalService, 150.0);

  const status1 = internalService.GetTransactionStatus("TXN-001");

  internalService.RefundPayment("TXN-001", 50.0);
  const paymentPro = new PaymentPro();
  const adapter = new PaymentProAdapter(paymentPro);

  ProcessOrder(adapter, 250.0);

  const transactionId = adapter.getLastTransactionId();
  const status2 = adapter.GetTransactionStatus(transactionId);

  adapter.RefundPayment(transactionId, 100.0);

  const paymentServices: IPaymentService[] = [
    new InternalPaymentService(),
    new PaymentProAdapter(new PaymentPro()),
  ];

  paymentServices.forEach((service, index) => {
    service.ProcessPayment(99.99, "USD");
  });

  const multiCurrencyAdapter = new PaymentProAdapter(new PaymentPro());

  const currencies = ["EUR", "USD", "GBP"];
  currencies.forEach((currency) => {
    multiCurrencyAdapter.ProcessPayment(100, currency);
  });
}
Main();
