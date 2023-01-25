//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
const subjects = require('../models/subjects');
const subjectsTable = db['subjects'];

const getAll = (req,res)=> {

    //On utilise l'ORM pour SELECT toute la table
    subjectsTable.findAll()

    //On utilise les promesses pour gérer les résultats de la requête.
    .then(result => {
        if (result.length === 0) {

            //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
            res.send("Aucune matière présent en base de données.")
        } else {
            // Sinon, on renvoie le résultat de notre requête
            res.json(result, 200)
        }
    })
    //en cas d'erreur, on passe dans le catch
    .catch(error => {
        //On définit un status d'erreur et un message a renvoyer
        const message = "La liste des matière n'a pas pu être récupérée. Réessayez dans quelques instants."
        res.status(500).json({
            message,
            data: error
        })
    })

}