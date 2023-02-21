//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
const referent_teachers = require('../models/referent_teachers');
const referentTeachersTable = db['referent_teachers'];

const getAll = (req,res)=> {
        
    //On utilise l'ORM pour SELECT toute la table
    referentTeachersTable.findAll()

    //On utilise les promesses pour gérer les résultats de la requête.
    .then(result => {
        if (result.length === 0) {

            //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
            res.json({Message : "Aucun professeur référent présent en base de données."})
        } else {
            // Sinon, on renvoie le résultat de notre requête
            res.json(result, 200)
        }
    })
    //en cas d'erreur, on passe dans le catch
    .catch(error => {
        //On définit un status d'erreur et un message a renvoyer
        const message = "La liste des professeurs référent n'a pas pu être récupérée. Réessayez dans quelques instants."
        res.status(500).json({
            message,
            data: error.message
        })
    })

}

const getOneById = (req, res) => {
    referentTeachersTable.findByPk(req.params.id)
        .then(referent_teachers => {
            if (!referent_teachers) {
                return res.status(404).json({ message: "Aucun professeur référent n'a été trouvé" })
            }
            res.status(200).json(referent_teachers)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération du professeur référent."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const createOne = (req, res) => {
    referentTeachersTable.create(req.body)

        .then(referent_teachers => {
            const message = "Un professeur référent et sa classe assigné est ajouté à la base de données."
            res.status(201).json({
                message,
                data: referent_teachers
            })
        })

        .catch(error => {
            const message = "Une erreur a eu lieu lors de l'insertion en base de donnée."
            if (error instanceof ValidationError) {
                res.status(400).send(error.errors[0].message)
            } else {
                res.status(500).json({
                    message,
                    error
                })
            }
        })
}

const updateOneById = (req, res) => {
    referentTeachersTable.update(
        req.body,
        {
            where: {
                id: req.params.id
            },
            returning: true,
        })
        .then(result => {
            const message = "Vos données sont correctement mis à jour."
            res.status(201).json({
                message
            });
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la modification."
            if (error instanceof ValidationError) {
                res.status(400).send(error.errors[0].message)
            } else {
                res.status(500).json({
                    message,
                    error
                })
            }
        });
};

const deleteOneById = (req, res) => {
    referentTeachersTable.findByPk(req.params.id)
    .then(referent_teachers => {
        if(!referent_teachers) {
            return res.status(404).json({message: "Aucun professeur référent n'a été trouvé"})
        }

        referentTeachersTable.destroy({
            where: {
                id: req.params.id
            }
        })

        .then(r => {
            const message = "Le professeur référent a bien été supprimé."
            res.status(200).send(message)
        })

        .catch(error => {
            const message = "Une erreur a eu lieu lors de la suppression."
            res.status(500).json({
                message,
                error
            })
        })
    })
}

const referentTeachersController = {
    getAll,
    getOneById,
    createOne,
    updateOneById,
    deleteOneById
}

module.exports = referentTeachersController