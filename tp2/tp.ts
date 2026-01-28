// Pattern Prototype - Système de Génération de Contrats d'Assurance

interface IPrototype {
  clone(): IPrototype;
}

interface InfosClient {
  nom: string;
  prenom: string;
  adresse: string;
  dateDebut: Date;
  dateFin: Date;
  montantCouverture: number;
  franchise?: number;
  options?: string[];
}

class ClauseStandard implements IPrototype {
  constructor(
    public titre: string,
    public contenu: string,
  ) {}
  clone(): ClauseStandard {
    return new ClauseStandard(this.titre, this.contenu);
  }
}

class Annexe implements IPrototype {
  constructor(
    public nom: string,
    public contenu: string,
  ) {}
  clone(): Annexe {
    return new Annexe(this.nom, this.contenu);
  }
}

abstract class Contrat implements IPrototype {
  protected type: string;
  protected clausesStandard: ClauseStandard[] = [];
  protected annexes: Annexe[] = [];
  protected infosClient?: InfosClient;
  protected numeroContrat: string;

  constructor(type: string) {
    this.type = type;
    this.numeroContrat = `${type.substring(0, 3).toUpperCase()}-${Date.now()}`;
    this.initialiserClauses();
    this.initialiserAnnexes();
  }

  protected abstract initialiserClauses(): void;
  protected abstract initialiserAnnexes(): void;
  abstract clone(): Contrat;

  personnaliser(infos: InfosClient): void {
    this.infosClient = { ...infos };
  }
}

class ContratHabitation extends Contrat {
  constructor() {
    super("Habitation");
  }

  protected initialiserClauses(): void {
    this.clausesStandard = [
      new ClauseStandard("Dégât Eaux", "Dégâts des eaux"),
    ];
  }

  protected initialiserAnnexes(): void {
    this.annexes = [new Annexe("Inventaire", "Liste des biens")];
  }

  clone(): ContratHabitation {
    const clone = new ContratHabitation();
    clone.clausesStandard = this.clausesStandard.map((c) => c.clone());
    clone.annexes = this.annexes.map((a) => a.clone());
    if (this.infosClient) clone.infosClient = { ...this.infosClient };
    return clone;
  }
}

class ContratAutomobile extends Contrat {
  private immatriculation?: string;

  constructor() {
    super("Automobile");
  }

  protected initialiserClauses(): void {
    this.clausesStandard = [
      new ClauseStandard("RC", "RC obligatoire"),
      new ClauseStandard("Vol", "Garantie vol"),
    ];
  }

  protected initialiserAnnexes(): void {
    this.annexes = [new Annexe("Carte Verte", "Attestation")];
  }

  personnaliserVehicule(immat: string): void {
    this.immatriculation = immat;
  }

  clone(): ContratAutomobile {
    const clone = new ContratAutomobile();
    clone.clausesStandard = this.clausesStandard.map((c) => c.clone());
    clone.annexes = this.annexes.map((a) => a.clone());
    if (this.infosClient) clone.infosClient = { ...this.infosClient };
    if (this.immatriculation) clone.immatriculation = this.immatriculation;
    return clone;
  }
}

class ContratVie extends Contrat {
  private beneficiaires: string[] = [];

  constructor() {
    super("Vie");
  }

  protected initialiserClauses(): void {
    this.clausesStandard = [new ClauseStandard("Capital Décès", "Capital")];
  }

  protected initialiserAnnexes(): void {
    this.annexes = [new Annexe("Questionnaire", "Santé")];
  }

  ajouterBeneficiaire(nom: string): void {
    this.beneficiaires.push(nom);
  }

  clone(): ContratVie {
    const clone = new ContratVie();
    clone.clausesStandard = this.clausesStandard.map((c) => c.clone());
    clone.annexes = this.annexes.map((a) => a.clone());
    if (this.infosClient) clone.infosClient = { ...this.infosClient };
    clone.beneficiaires = [...this.beneficiaires];
    return clone;
  }
}

class RegistrePrototypes {
  private prototypes = new Map<string, Contrat>();

  enregistrer(nom: string, prototype: Contrat): void {
    this.prototypes.set(nom, prototype);
  }

  creer(nom: string): Contrat | undefined {
    return this.prototypes.get(nom)?.clone();
  }
}

const registre = new RegistrePrototypes();
registre.enregistrer("habitation", new ContratHabitation());
registre.enregistrer("automobile", new ContratAutomobile());
registre.enregistrer("vie", new ContratVie());

const c1 = registre.creer("habitation");
c1?.personnaliser({
  nom: "Dupont",
  prenom: "Jean",
  adresse: "Paris",
  dateDebut: new Date("2024-01-01"),
  dateFin: new Date("2024-12-31"),
  montantCouverture: 250000,
  franchise: 500,
});

const c2 = c1?.clone();
c2?.personnaliser({ ...c1?.["infosClient"]!, franchise: 300 });
