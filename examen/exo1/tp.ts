// Configuration Hospitalière

class HospitalConfiguration {
  private static instance: HospitalConfiguration;
  private static lock: boolean = false;

  private databaseHost: string = "localhost";
  private databasePort: number = 5431;
  private databaseName: string = "hospital_db";
  private databaseUser: string = "admin";

  private language: string = "fr";
  private timezone: string = "Europe/Paris";

  private constructor() {}

  public static getInstance(): HospitalConfiguration {
    // Permet de garantir que l'instance est unique
    if (!HospitalConfiguration.instance) {
      if (!HospitalConfiguration.lock) {
        HospitalConfiguration.lock = true;
        if (!HospitalConfiguration.instance) {
          HospitalConfiguration.instance = new HospitalConfiguration();
        }
        HospitalConfiguration.lock = false;
      }
    }
    return HospitalConfiguration.instance;
  }

  public getDatabaseHost(): string {
    return this.databaseHost;
  }

  public getDatabasePort(): number {
    return this.databasePort;
  }

  public getDatabaseName(): string {
    return this.databaseName;
  }

  public getConnectionString(): string {
    return `postgresql://${this.databaseUser}:@${this.databaseHost}:${this.databasePort}/${this.databaseName}`;
  }

  public getLanguage(): string {
    return this.language;
  }

  public setLanguage(lang: string): void {
    this.language = lang;
  }

  public getTimezone(): string {
    return this.timezone;
  }

  public setTimezone(tz: string): void {
    this.timezone = tz;
  }
}

class PatientModule {
  public managePatients(): void {
    const config = HospitalConfiguration.getInstance();
    console.log(config.getConnectionString());
  }
}

class AppointmentModule {
  public scheduleAppointment(): void {
    const config = HospitalConfiguration.getInstance();
    console.log(config.getLanguage());
  }
}

class BillingModule {
  public processBilling(): void {
    const config = HospitalConfiguration.getInstance();
    console.log(config.getTimezone());
  }
}

const config1 = HospitalConfiguration.getInstance();
const config2 = HospitalConfiguration.getInstance();

const patientModule = new PatientModule();
const appointmentModule = new AppointmentModule();
const billingModule = new BillingModule();

patientModule.managePatients();
appointmentModule.scheduleAppointment();
billingModule.processBilling();
