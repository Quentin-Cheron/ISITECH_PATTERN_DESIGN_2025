Examen - Design Patterns
Durée conseillée: 1h30

Exercice 1 : Conception (5 points)
Contexte
Une application de gestion hospitalière nécessite un système de configuration centralisé. Ce système doit :

Stocker les paramètres de connexion à la base de données
Conserver les préférences globales de l'application (langue, fuseau horaire, etc.)
Être accessible depuis n'importe quel module de l'application
Garantir que tous les modules utilisent exactement les mêmes paramètres
Le problème actuel est que différents modules créent leurs propres instances de configuration, ce qui entraîne des incohérences.

Questions
1.1 Quel pattern de conception résout ce problème ? Justifiez. (1 point)

1.2 Réalisez le diagramme de classes UML de votre solution. (1.5 points)

1.3 Proposez une implémentation thread-safe dans le langage de votre choix. (2 points)

1.4 Quels sont les avantages et inconvénients de ce pattern ? Citez-en au moins 2 de chaque. (0.5 point)

Exercice 2 : Identification de Pattern (4 points)
Analysez le code suivant et répondez aux questions.

public interface IVehicle
{
void Assemble();
}

public class Car : IVehicle
{
public void Assemble() => Console.WriteLine("Assemblage voiture: châssis, moteur, roues, carrosserie");
}

public class Motorcycle : IVehicle
{
public void Assemble() => Console.WriteLine("Assemblage moto: cadre, moteur, 2 roues");
}

public class Truck : IVehicle
{
public void Assemble() => Console.WriteLine("Assemblage camion: châssis renforcé, moteur diesel, 6 roues, remorque");
}

public abstract class VehicleFactory
{
public abstract IVehicle CreateVehicle();

    public void OrderVehicle()
    {
        var vehicle = CreateVehicle();
        Console.WriteLine("Commande enregistrée");
        vehicle.Assemble();
        Console.WriteLine("Véhicule prêt pour livraison");
    }

}

public class CarFactory : VehicleFactory
{
public override IVehicle CreateVehicle() => new Car();
}

public class MotorcycleFactory : VehicleFactory
{
public override IVehicle CreateVehicle() => new Motorcycle();
}

public class TruckFactory : VehicleFactory
{
public override IVehicle CreateVehicle() => new Truck();
}
Questions
2.1 Identifiez le pattern utilisé. (0.5 point)

2.2 Listez les participants du pattern et associez-les aux classes du code. (1.5 points)

2.3 Expliquez le rôle de la méthode OrderVehicle() dans ce pattern. Comment s'appelle ce type de méthode ? (1 point)

2.4 Quelle différence fondamentale y a-t-il entre ce pattern et Abstract Factory ? Dans quel cas préféreriez-vous l'un à l'autre ? (1 point)

Exercice 3 : Correction de Pattern (4 points)
Le code suivant tente d'implémenter le pattern Decorator pour un système de calcul de prix de café, mais contient plusieurs erreurs conceptuelles et techniques.

public class Coffee
{
public virtual string GetDescription() => "Café simple";
public virtual double GetCost() => 2.0;
}

public class MilkDecorator : Coffee
{
public override string GetDescription() => "Café simple, Lait";
public override double GetCost() => 2.5;
}

public class SugarDecorator : Coffee
{
public override string GetDescription() => "Café simple, Sucre";
public override double GetCost() => 2.2;
}

public class CaramelDecorator : Coffee
{
public override string GetDescription() => "Café simple, Caramel";
public override double GetCost() => 2.8;
}

// Utilisation
class Program
{
static void Main()
{
var coffee = new CaramelDecorator();
Console.WriteLine($"{coffee.GetDescription()} : {coffee.GetCost()}€");
// Affiche: "Café simple, Caramel : 2.8€"
// Attendu: possibilité de combiner plusieurs décorations
}
}
Questions
3.1 Identifiez au moins 3 erreurs ou problèmes dans cette implémentation. (1.5 points)

3.2 Réécrivez le code en respectant correctement le pattern Decorator. Votre solution doit permettre de créer un café avec lait, sucre ET caramel. (2.5 points)

Exercice 4 : Résolution de Problème (4 points)
Le code suivant présente un problème de conception. Analysez-le et proposez une solution.

public class NotificationService
{
public void SendNotification(string message, string type, string recipient)
{
if (type == "email")
{
Console.WriteLine($"Connexion au serveur SMTP...");
            Console.WriteLine($"Envoi email à {recipient}: {message}");
Console.WriteLine($"Déconnexion SMTP");
        }
        else if (type == "sms")
        {
            Console.WriteLine($"Connexion API SMS...");
Console.WriteLine($"Envoi SMS à {recipient}: {message}");
            Console.WriteLine($"Déconnexion API");
}
else if (type == "push")
{
Console.WriteLine($"Connexion Firebase...");
            Console.WriteLine($"Envoi push à {recipient}: {message}");
Console.WriteLine($"Déconnexion Firebase");
        }
        else if (type == "slack")
        {
            Console.WriteLine($"Connexion Slack API...");
Console.WriteLine($"Envoi Slack à {recipient}: {message}");
            Console.WriteLine($"Déconnexion Slack");
}
// ... et si on doit ajouter WhatsApp, Telegram, Discord ?
}
}

// Utilisation
class Program
{
static void Main()
{
var service = new NotificationService();
service.SendNotification("Votre commande est prête", "email", "client@example.com");
service.SendNotification("Code: 1234", "sms", "+33612345678");
}
}
Questions
4.1 Identifiez les violations des principes SOLID dans ce code. (1 point)

4.2 Quel pattern de conception permettrait de résoudre ces problèmes ? Justifiez. (1 point)

4.3 Proposez une implémentation corrigée avec le pattern identifié. Incluez au moins 2 types de notifications. (2 points)

Exercice 5 : Analyse UML (3 points)
Observez le diagramme de classes suivant :

┌─────────────────────────────┐
│ «interface» │
│ IComponent │
├─────────────────────────────┤
│ + Operation(): void │
│ + Add(c: IComponent): void │
│ + Remove(c: IComponent): void│
│ + GetChild(i: int): IComponent│
└──────────────┬──────────────┘
│
┌───────┴───────┐
│ │
▼ ▼
┌──────────────┐ ┌──────────────────┐
│ Leaf │ │ Composite │
├──────────────┤ ├──────────────────┤
│ │ │ -children: List │
├──────────────┤ ├──────────────────┤
│ +Operation() │ │ +Operation() │
│ +Add() │ │ +Add() │
│ +Remove() │ │ +Remove() │
│ +GetChild() │ │ +GetChild() │
└──────────────┘ └──────────────────┘
Questions
5.1 Identifiez le pattern représenté. (0.5 point)

5.2 Expliquez le rôle de chaque participant (IComponent, Leaf, Composite). (1 point)

5.3 Donnez un exemple concret d'utilisation de ce pattern (domaine métier + cas d'usage). (0.5 point)

5.4 La classe Leaf implémente Add(), Remove() et GetChild() qui n'ont pas de sens pour elle. Proposez deux approches pour gérer ce problème et expliquez leurs compromis. (1 point)
