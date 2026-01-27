# Design Patterns - Guide Pratique

> Les design patterns sont des solutions réutilisables aux problèmes courants de programmation.

## 🏭 Patterns Créationnels

### Singleton

**Garantit qu'une classe n'a qu'une seule instance.**

```typescript
class Database {
  private static instance: Database;
  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true
```

**Utilisation :** Connexion DB, configuration, logger.

---

### Factory Method

**Crée des objets sans spécifier leur classe exacte.**

```typescript
interface Notification {
  send(msg: string): void;
}

class EmailNotif implements Notification {
  send(msg: string) {
    console.log(`📧 ${msg}`);
  }
}

class SMSNotif implements Notification {
  send(msg: string) {
    console.log(`📱 ${msg}`);
  }
}

class NotificationFactory {
  static create(type: string): Notification {
    if (type === "email") return new EmailNotif();
    if (type === "sms") return new SMSNotif();
    throw new Error("Type inconnu");
  }
}

const notif = NotificationFactory.create("email");
notif.send("Hello");
```

**Utilisation :** Créer différents types d'objets selon un paramètre.

---

### Abstract Factory

**Crée des familles d'objets liés.**

```typescript
interface Button {
  render(): void;
}
interface Checkbox {
  check(): void;
}

class WindowsButton implements Button {
  render() {
    console.log("[Windows Button]");
  }
}

class MacButton implements Button {
  render() {
    console.log("(Mac Button)");
  }
}

interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class WindowsFactory implements GUIFactory {
  createButton() {
    return new WindowsButton();
  }
  createCheckbox() {
    /* ... */
  }
}

const factory: GUIFactory = new WindowsFactory();
const btn = factory.createButton();
btn.render();
```

**Utilisation :** Interface multi-plateforme, thèmes cohérents.

---

### Builder

**Construit un objet complexe étape par étape.**

```typescript
class Pizza {
  dough?: string;
  sauce?: string;
  toppings: string[] = [];
}

class PizzaBuilder {
  private pizza = new Pizza();

  withDough(dough: string): this {
    this.pizza.dough = dough;
    return this;
  }

  withSauce(sauce: string): this {
    this.pizza.sauce = sauce;
    return this;
  }

  addTopping(topping: string): this {
    this.pizza.toppings.push(topping);
    return this;
  }

  build(): Pizza {
    return this.pizza;
  }
}

const pizza = new PizzaBuilder()
  .withDough("fine")
  .withSauce("tomate")
  .addTopping("mozzarella")
  .addTopping("basilic")
  .build();
```

**Utilisation :** Objets avec beaucoup d'options, éviter les constructeurs longs.

---

### Prototype

**Crée des objets par clonage.**

```typescript
class Shape {
  x: number = 0;
  y: number = 0;

  clone(): this {
    return Object.create(this);
  }
}

class Circle extends Shape {
  radius: number = 0;
}

const circle1 = new Circle();
circle1.radius = 10;

const circle2 = circle1.clone();
circle2.radius = 20;

console.log(circle1.radius); // 10
console.log(circle2.radius); // 20
```

**Utilisation :** Copier des objets complexes, éviter une création coûteuse.

---

## 🧱 Patterns Structurels

### Adapter

**Rend compatibles deux interfaces incompatibles.**

```typescript
// Service existant
class OldAPI {
  getData(): string {
    return "<xml>data</xml>";
  }
}

// Interface moderne
interface ModernAPI {
  getData(): object;
}

// Adapter
class APIAdapter implements ModernAPI {
  constructor(private oldAPI: OldAPI) {}

  getData(): object {
    const xml = this.oldAPI.getData();
    return { data: "parsed" }; // Conversion XML → JSON
  }
}

const api: ModernAPI = new APIAdapter(new OldAPI());
console.log(api.getData());
```

**Utilisation :** Intégrer du code legacy, librairies tierces.

---

### Decorator

**Ajoute des fonctionnalités dynamiquement.**

```typescript
interface Coffee {
  cost(): number;
  description(): string;
}

class Espresso implements Coffee {
  cost() {
    return 2;
  }
  description() {
    return "Espresso";
  }
}

class WithMilk implements Coffee {
  constructor(private coffee: Coffee) {}

  cost() {
    return this.coffee.cost() + 0.5;
  }
  description() {
    return this.coffee.description() + " + Lait";
  }
}

class WithCaramel implements Coffee {
  constructor(private coffee: Coffee) {}

  cost() {
    return this.coffee.cost() + 0.7;
  }
  description() {
    return this.coffee.description() + " + Caramel";
  }
}

let coffee: Coffee = new Espresso();
coffee = new WithMilk(coffee);
coffee = new WithCaramel(coffee);

console.log(coffee.description()); // "Espresso + Lait + Caramel"
console.log(coffee.cost()); // 3.2
```

**Utilisation :** Ajouter des fonctionnalités sans modifier la classe de base.

---

### Facade

**Interface simplifiée pour un système complexe.**

```typescript
class TV {
  on() {
    console.log("TV On");
  }
  off() {
    console.log("TV Off");
  }
}

class SoundSystem {
  on() {
    console.log("Sound On");
  }
  setVolume(v: number) {
    console.log(`Volume ${v}`);
  }
}

class Lights {
  dim(level: number) {
    console.log(`Lights ${level}%`);
  }
}

class HomeTheaterFacade {
  constructor(
    private tv: TV,
    private sound: SoundSystem,
    private lights: Lights,
  ) {}

  watchMovie() {
    this.lights.dim(10);
    this.sound.on();
    this.sound.setVolume(50);
    this.tv.on();
  }

  endMovie() {
    this.tv.off();
    this.sound.off();
    this.lights.dim(100);
  }
}

const theater = new HomeTheaterFacade(
  new TV(),
  new SoundSystem(),
  new Lights(),
);
theater.watchMovie();
```

**Utilisation :** Simplifier un système complexe, API haut niveau.

---

### Composite

**Traite les objets individuels et les groupes uniformément.**

```typescript
interface Component {
  getPrice(): number;
}

class Product implements Component {
  constructor(private price: number) {}
  getPrice() {
    return this.price;
  }
}

class Box implements Component {
  private items: Component[] = [];

  add(item: Component) {
    this.items.push(item);
  }

  getPrice() {
    return this.items.reduce((sum, item) => sum + item.getPrice(), 0);
  }
}

const box = new Box();
box.add(new Product(10));
box.add(new Product(20));

const bigBox = new Box();
bigBox.add(box);
bigBox.add(new Product(5));

console.log(bigBox.getPrice()); // 35
```

**Utilisation :** Arborescences (menus, dossiers), structures hiérarchiques.

---

### Proxy

**Contrôle l'accès à un objet.**

```typescript
interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(private filename: string) {
    this.load();
  }

  private load() {
    console.log(`Loading ${this.filename}...`);
  }

  display() {
    console.log(`Displaying ${this.filename}`);
  }
}

class ImageProxy implements Image {
  private realImage?: RealImage;

  constructor(private filename: string) {}

  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// L'image n'est chargée qu'au premier display()
const image = new ImageProxy("photo.jpg");
image.display(); // Loading + Displaying
image.display(); // Displaying seulement
```

**Utilisation :** Lazy loading, contrôle d'accès, cache.

---

## 💬 Patterns Comportementaux

### Observer

**Notifie automatiquement les observateurs d'un changement.**

```typescript
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  notify(data: any) {
    this.observers.forEach((o) => o.update(data));
  }
}

class EmailObserver implements Observer {
  update(data: any) {
    console.log(`📧 Email: ${data}`);
  }
}

class SMSObserver implements Observer {
  update(data: any) {
    console.log(`📱 SMS: ${data}`);
  }
}

const subject = new Subject();
subject.subscribe(new EmailObserver());
subject.subscribe(new SMSObserver());

subject.notify("Nouvelle commande");
// 📧 Email: Nouvelle commande
// 📱 SMS: Nouvelle commande
```

**Utilisation :** Événements, notifications, pub/sub.

---

### Strategy

**Change d'algorithme à l'exécution.**

```typescript
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCard implements PaymentStrategy {
  pay(amount: number) {
    console.log(`💳 Paid ${amount}€ by card`);
  }
}

class PayPal implements PaymentStrategy {
  pay(amount: number) {
    console.log(`🅿️ Paid ${amount}€ via PayPal`);
  }
}

class ShoppingCart {
  private strategy?: PaymentStrategy;

  setPaymentStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  checkout(amount: number) {
    this.strategy?.pay(amount);
  }
}

const cart = new ShoppingCart();
cart.setPaymentStrategy(new CreditCard());
cart.checkout(100);

cart.setPaymentStrategy(new PayPal());
cart.checkout(100);
```

**Utilisation :** Algorithmes interchangeables, éviter les if/else multiples.

---

### Command

**Encapsule une action en tant qu'objet.**

```typescript
interface Command {
  execute(): void;
  undo(): void;
}

class Light {
  on() {
    console.log("💡 Light ON");
  }
  off() {
    console.log("🌑 Light OFF");
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.on();
  }
  undo() {
    this.light.off();
  }
}

class RemoteControl {
  private history: Command[] = [];

  press(command: Command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    command?.undo();
  }
}

const light = new Light();
const remote = new RemoteControl();

remote.press(new LightOnCommand(light)); // 💡 Light ON
remote.undo(); // 🌑 Light OFF
```

**Utilisation :** Undo/Redo, file d'attente d'actions, transactions.

---

### State

**Change le comportement selon l'état.**

```typescript
interface State {
  handle(context: Context): void;
}

class Context {
  private state: State;

  constructor(initialState: State) {
    this.state = initialState;
  }

  setState(state: State) {
    this.state = state;
  }

  request() {
    this.state.handle(this);
  }
}

class StateA implements State {
  handle(context: Context) {
    console.log("State A → Going to B");
    context.setState(new StateB());
  }
}

class StateB implements State {
  handle(context: Context) {
    console.log("State B → Going to A");
    context.setState(new StateA());
  }
}

const context = new Context(new StateA());
context.request(); // State A → Going to B
context.request(); // State B → Going to A
```

**Utilisation :** Machine à états, workflow, connexion réseau.

---

### Template Method

**Définit le squelette d'un algorithme.**

```typescript
abstract class DataParser {
  // Template method
  parse() {
    this.openFile();
    this.extractData();
    this.parseData();
    this.closeFile();
  }

  private openFile() {
    console.log("Opening file...");
  }

  private closeFile() {
    console.log("Closing file...");
  }

  // À implémenter par les sous-classes
  protected abstract extractData(): void;
  protected abstract parseData(): void;
}

class CSVParser extends DataParser {
  protected extractData() {
    console.log("Extracting CSV data");
  }
  protected parseData() {
    console.log("Parsing CSV");
  }
}

class JSONParser extends DataParser {
  protected extractData() {
    console.log("Extracting JSON data");
  }
  protected parseData() {
    console.log("Parsing JSON");
  }
}

new CSVParser().parse();
// Opening file...
// Extracting CSV data
// Parsing CSV
// Closing file...
```

**Utilisation :** Algorithme avec étapes fixes mais personnalisables.

---

### Iterator

**Parcourt une collection sans exposer sa structure.**

```typescript
class Collection<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  *[Symbol.iterator]() {
    for (const item of this.items) {
      yield item;
    }
  }

  *reverse() {
    for (let i = this.items.length - 1; i >= 0; i--) {
      yield this.items[i];
    }
  }
}

const collection = new Collection<number>();
collection.add(1);
collection.add(2);
collection.add(3);

for (const item of collection) {
  console.log(item); // 1, 2, 3
}

for (const item of collection.reverse()) {
  console.log(item); // 3, 2, 1
}
```

**Utilisation :** Parcours personnalisés, cacher la structure interne.

---

## 📋 Tableau Récapitulatif

| Besoin                                    | Pattern              |
| ----------------------------------------- | -------------------- |
| Une seule instance                        | **Singleton**        |
| Créer des objets sans connaître la classe | **Factory Method**   |
| Créer des familles d'objets               | **Abstract Factory** |
| Construction étape par étape              | **Builder**          |
| Copier un objet                           | **Prototype**        |
| Interfaces incompatibles                  | **Adapter**          |
| Ajouter des fonctionnalités               | **Decorator**        |
| Simplifier un système complexe            | **Facade**           |
| Arborescence d'objets                     | **Composite**        |
| Contrôler l'accès                         | **Proxy**            |
| Notifier des changements                  | **Observer**         |
| Changer d'algorithme                      | **Strategy**         |
| Encapsuler des actions (undo/redo)        | **Command**          |
| Comportement selon l'état                 | **State**            |
| Algorithme avec étapes fixes              | **Template Method**  |
| Parcourir une collection                  | **Iterator**         |

---

## 🚀 Utilisation

```bash
# Installer les dépendances
npm install

# Exécuter les exemples
npx tsx src/examples/singleton.ts

# Lancer les tests
npm test
```

---

**Bon apprentissage ! 🎓**
