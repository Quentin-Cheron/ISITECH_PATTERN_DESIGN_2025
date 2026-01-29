// VERSION INCORRECTE (avec erreurs)

class CoffeeIncorrect {
  public getDescription(): string {
    return "Café simple";
  }

  public getCost(): number {
    return 2.0;
  }
}

class MilkDecoratorIncorrect extends CoffeeIncorrect {
  public getDescription(): string {
    return "Café simple, Lait";
  }

  public getCost(): number {
    return 2.5;
  }
}

class SugarDecoratorIncorrect extends CoffeeIncorrect {
  public getDescription(): string {
    return "Café simple, Sucre";
  }

  public getCost(): number {
    return 2.2;
  }
}

class CaramelDecoratorIncorrect extends CoffeeIncorrect {
  public getDescription(): string {
    return "Café simple, Caramel";
  }

  public getCost(): number {
    return 2.8;
  }
}

const coffeeIncorrect = new CaramelDecoratorIncorrect();
console.log(
  `Version incorrecte ${coffeeIncorrect.getDescription()} : ${coffeeIncorrect.getCost()}€`,
);

// Affiche: "Café simple, Caramel : 2.8€"
// ❌ Impossible de combiner plusieurs décorations

// VERSION CORRECTE (Pattern Decorator)

interface ICoffee {
  getDescription(): string;
  getCost(): number;
}

class SimpleCoffee implements ICoffee {
  public getDescription(): string {
    return "Café";
  }

  public getCost(): number {
    return 2.0;
  }
}

abstract class CoffeeDecorator implements ICoffee {
  protected coffee: ICoffee;

  constructor(coffee: ICoffee) {
    this.coffee = coffee;
  }

  public getDescription(): string {
    return this.coffee.getDescription();
  }

  public getCost(): number {
    return this.coffee.getCost();
  }
}

class MilkDecorator extends CoffeeDecorator {
  constructor(coffee: ICoffee) {
    super(coffee);
  }

  public getDescription(): string {
    return this.coffee.getDescription() + " + Lait";
  }

  public getCost(): number {
    return this.coffee.getCost() + 0.5;
  }
}

class SugarDecorator extends CoffeeDecorator {
  constructor(coffee: ICoffee) {
    super(coffee);
  }

  public getDescription(): string {
    return this.coffee.getDescription() + " + Sucre";
  }

  public getCost(): number {
    return this.coffee.getCost() + 0.2;
  }
}

class CaramelDecorator extends CoffeeDecorator {
  constructor(coffee: ICoffee) {
    super(coffee);
  }

  public getDescription(): string {
    return this.coffee.getDescription() + " + Caramel";
  }

  public getCost(): number {
    return this.coffee.getCost() + 0.8;
  }
}

// DÉMONSTRATION

let myCoffee: ICoffee = new SimpleCoffee();

myCoffee = new MilkDecorator(myCoffee);

myCoffee = new SugarDecorator(myCoffee);

myCoffee = new CaramelDecorator(myCoffee);

const fancyCoffee: ICoffee = new CaramelDecorator(
  new SugarDecorator(new MilkDecorator(new SimpleCoffee())),
);

console.log(
  `Version correct ${fancyCoffee.getDescription()} : ${fancyCoffee.getCost()}€`,
);
