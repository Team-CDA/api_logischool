// Déclaration des variables
var choixJoueur1 = prompt("Choisissez entre pierre, feuille ou ciseaux");
var choixJoueur2 = prompt("Choisissez entre pierre, feuille ou ciseaux");
var compteurJoueur1 = 0;
var compteurJoueur2 = 0;

// Fonction pour déterminer le gagnant
function determinerGagnant(joueur1, joueur2) {
    if (joueur1 === joueur2) {
        return "Egalité";
    } else if ((joueur1 === "pierre" && joueur2 === "ciseaux") ||
               (joueur1 === "feuille" && joueur2 === "pierre") ||
               (joueur1 === "ciseaux" && joueur2 === "feuille")) {
        compteurJoueur1++;
        return "Le joueur 1 gagne";
    } else {
        compteurJoueur2++;
        return "Le joueur 2 gagne";
    }
}

// Appel de la fonction pour déterminer le gagnant
var resultat = determinerGagnant(choixJoueur1, choixJoueur2);

// Affichage des résultats
console.log("Le joueur 1 a choisi " + choixJoueur1);
console.log("Le joueur 2 a choisi " + choixJoueur2);
console.log(resultat);
console.log("Le score est de " + compteurJoueur1 + " pour le joueur 1 et de " + compteurJoueur2 + " pour le joueur 2");
