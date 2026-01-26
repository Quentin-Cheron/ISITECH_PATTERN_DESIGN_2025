abstract class Documents {
  abstract affiche(): void;
  abstract imprime(): void;
}

class CertificatCessionVierge extends Documents {
  affiche(): void {}
  imprime(): void {}
}

class DemandeImmatriculationVierge extends Documents {
  affiche(): void {}
  imprime(): void {}
}

class BonCommandeVierge extends Documents {
  affiche(): void {}
  imprime(): void {}
}

class LiasseVierge {
  private static instance: LiasseVierge | null = null;
  private documents: Documents[] = [];

  private constructor() {
    this.documents.push(new CertificatCessionVierge());
    this.documents.push(new DemandeImmatriculationVierge());
    this.documents.push(new BonCommandeVierge());
  }

  public static getInstance(): LiasseVierge {
    if (LiasseVierge.instance === null) {
      LiasseVierge.instance = new LiasseVierge();
    }
    return LiasseVierge.instance;
  }

  public addTo(document: Documents): void {
    this.documents.push(document);
  }

  public afficheTousLesDocuments(): void {
    this.documents.forEach((doc) => doc.affiche());
  }

  public imprimeTousLesDocuments(): void {
    this.documents.forEach((doc) => doc.imprime());
  }
}

const bonCommande = new BonCommandeVierge();
bonCommande.affiche();
const liasse = LiasseVierge.getInstance();
liasse.addTo(bonCommande);
liasse.afficheTousLesDocuments();
liasse.imprimeTousLesDocuments();
