# Système de Traitement de Messages - Pattern Decorator

## Question 1 : Quel pattern de conception ?

Le **pattern Decorator** permet d'ajouter dynamiquement des responsabilités à un objet sans modifier sa classe d'origine. Il évite l'explosion combinatoire en empilant des décorateurs qui s'enchaînent, chacun ajoutant un comportement spécifique.

## Question 4 : Ajout d'un nouveau traitement (Open/Closed)

Pour ajouter un nouveau traitement comme "Watermarking", il suffit de créer une nouvelle classe `WatermarkingDecorator` qui hérite de `MessageDecorator`. Aucune modification des classes existantes n'est nécessaire, respectant ainsi le principe Open/Closed : ouvert à l'extension, fermé à la modification.
