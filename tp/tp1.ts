interface RIB {
  genererRib(): string;
}

interface Attestation {
  genererAttestation(): string;
}

class RIBParticulier implements RIB {
  constructor(private rib: string) {}

  genererRib(): string {
    return `RIB Simplifié: ${this.rib}`;
  }
}

class AttestationParticulier implements Attestation {
  constructor(private attestation: string) {}

  genererAttestation(): string {
    return `Attestation Simplifiée: ${this.attestation}`;
  }
}

class RIBProfessionnel implements RIB {
  constructor(
    private rib: string,
    private siret: string,
  ) {}

  genererRib(): string {
    return `RIB Détaillé: ${this.rib} - SIRET: ${this.siret}`;
  }
}

class AttestationProfessionnel implements Attestation {
  constructor(
    private attestation: string,
    private mentionLegale: string,
  ) {}

  genererAttestation(): string {
    return `Attestation Détaillée: ${this.attestation} - Mention Légale: ${this.mentionLegale}`;
  }
}

interface DocumentFactory {
  creerRIB(): RIB;
  creerAttestation(): Attestation;
}

class Particulier {
  constructor(
    public rib: string,
    public attestation: string,
  ) {}
}

class Professionnel {
  constructor(
    public rib: string,
    public attestation: string,
    public siret: string,
    public mentionLegale: string,
  ) {}
}

class ParticulierFactory implements DocumentFactory {
  constructor(private client: Particulier) {}

  creerRIB(): RIB {
    return new RIBParticulier(this.client.rib);
  }

  creerAttestation(): Attestation {
    return new AttestationParticulier(this.client.attestation);
  }
}

class ProfessionnelFactory implements DocumentFactory {
  constructor(private client: Professionnel) {}

  creerRIB(): RIB {
    return new RIBProfessionnel(this.client.rib, this.client.siret);
  }

  creerAttestation(): Attestation {
    return new AttestationProfessionnel(
      this.client.attestation,
      this.client.mentionLegale,
    );
  }
}

function main() {
  // Client particulier
  const particulier = new Particulier("FR76...", "Attestation valide");
  const factoryParticulier = new ParticulierFactory(particulier);

  const rib1 = factoryParticulier.creerRIB();
  const att1 = factoryParticulier.creerAttestation();

  console.log(rib1.genererRib());
  console.log(att1.genererAttestation());

  // Client professionnel
  const pro = new Professionnel(
    "FR76...",
    "Attestation valide",
    "123456789",
    "SAS",
  );
  const factoryPro = new ProfessionnelFactory(pro);

  const rib2 = factoryPro.creerRIB();
  const att2 = factoryPro.creerAttestation();

  console.log(rib2.genererRib());
  console.log(att2.genererAttestation());
}

main();
