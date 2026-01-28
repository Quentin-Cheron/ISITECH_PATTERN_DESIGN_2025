interface IPaymentService {
  ProcessPayment(amount: number, currency: string): boolean;
  RefundPayment(transactionId: string, amount: number): boolean;
  GetTransactionStatus(transactionId: string): string;
}

class InternalPaymentService implements IPaymentService {
  ProcessPayment(amount: number, currency: string): boolean {
    console.log(`💳 Paiement interne: ${amount} ${currency}`);
    return true;
  }

  RefundPayment(transactionId: string, amount: number): boolean {
    console.log(`↩️  Remboursement interne: ${transactionId} - ${amount}`);
    return true;
  }

  GetTransactionStatus(transactionId: string): string {
    return "Completed";
  }
}

class PaymentPro {
  // Exécute une transaction avec code devise numérique
  // Codes devise : 1=EUR, 2=USD, 3=GBP
  ExecuterTransaction(montant: number, codeDevise: number): string {
    console.log(
      `🔷 PaymentPro: Transaction de ${montant} avec devise code ${codeDevise}`,
    );
    return this.generateId();
  }

  // Annule complètement une transaction
  AnnulerTransaction(reference: string): boolean {
    console.log(`🔷 PaymentPro: Annulation de ${reference}`);
    return true;
  }

  // Retourne un code numérique : 0=En cours, 1=Validé, 2=Échoué
  ObtenirEtat(reference: string): number {
    return 1; // Simulé comme validé
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
  private paymentPro: PaymentPro; // Composition : contient l'objet à adapter
  private lastTransactionId: string = ""; // Stocke le dernier ID de transaction

  // Table de conversion : devise string → code numérique PaymentPro
  // Selon la spec : 1=EUR, 2=USD, 3=GBP
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
      `\n🔄 [ADAPTER] Conversion de ProcessPayment vers ExecuterTransaction`,
    );

    // 1. Convertir la devise string en code numérique
    const codeDevise = this.convertCurrencyStringToCode(currency);
    console.log(`   ├─ Devise: "${currency}" → code ${codeDevise}`);

    // 2. Appeler la méthode de PaymentPro avec les paramètres convertis
    const transactionId = this.paymentPro.ExecuterTransaction(
      amount,
      codeDevise,
    );

    // 3. Stocker l'ID pour les opérations ultérieures
    this.lastTransactionId = transactionId;

    // 4. Adapter le retour : string (ID) → boolean (succès si ID non vide)
    const success = transactionId.length > 0;
    console.log(
      `   └─ Résultat: ID="${transactionId.substring(0, 8)}..." → success=${success}\n`,
    );

    return success;
  }

  RefundPayment(transactionId: string, amount: number): boolean {
    console.log(
      `\n🔄 [ADAPTER] Conversion de RefundPayment vers AnnulerTransaction`,
    );
    console.log(`   ├─ Transaction: ${transactionId}`);
    console.log(
      `   ├─ Montant demandé: ${amount} (ignoré par PaymentPro - annulation complète)`,
    );

    // Appeler la méthode d'annulation de PaymentPro
    const result = this.paymentPro.AnnulerTransaction(transactionId);

    console.log(`   └─ Résultat: ${result}\n`);
    return result;
  }

  GetTransactionStatus(transactionId: string): string {
    console.log(
      `\n🔄 [ADAPTER] Conversion de GetTransactionStatus vers ObtenirEtat`,
    );

    // 1. Appeler la méthode de PaymentPro
    const statusCode = this.paymentPro.ObtenirEtat(transactionId);

    // 2. Convertir le code numérique en string descriptif
    const statusString = this.convertStatusCodeToString(statusCode);

    console.log(`   ├─ Code PaymentPro: ${statusCode}`);
    console.log(`   └─ Statut IPaymentService: "${statusString}"\n`);

    return statusString;
  }

  // Convertit une devise string (EUR, USD, GBP) en code numérique (1, 2, 3)
  private convertCurrencyStringToCode(currency: string): number {
    const code = this.currencyMap.get(currency.toUpperCase());

    if (code === undefined) {
      console.warn(
        `⚠️  Devise "${currency}" non supportée, utilisation de EUR par défaut`,
      );
      return 1; // EUR par défaut
    }

    return code;
  }

  // Convertit un code de statut numérique en string descriptif
  // 0 → "Pending", 1 → "Completed", 2 → "Failed"
  private convertStatusCodeToString(statusCode: number): string {
    switch (statusCode) {
      case 0:
        return "Pending"; // En cours
      case 1:
        return "Completed"; // Validé
      case 2:
        return "Failed"; // Échoué
      default:
        return "Unknown"; // Statut inconnu
    }
  }

  // Getter pour récupérer le dernier ID de transaction (utile pour les tests)
  getLastTransactionId(): string {
    return this.lastTransactionId;
  }
}

function ProcessOrder(paymentService: IPaymentService, total: number): void {
  console.log(`📦 Traitement d'une commande de ${total} EUR`);
  const success = paymentService.ProcessPayment(total, "EUR");
  if (success) {
    console.log("✅ Commande traitée avec succès");
  } else {
    console.log("❌ Échec du traitement de la commande");
  }
}
