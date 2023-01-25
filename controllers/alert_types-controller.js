const db = require('../models/index');
const alert_types = require('../models/alert_types');
const alertTypesTable = db['alert_types'];

const getAll = (req,res)=> {

    //On utilise l'ORM pour SELECT toute la table
    alertTypesTable.findAll()

    //On utilise les promesses pour gérer les résultats de la requête.
    .then(result => {
        if (result.length === 0) {

            //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
            res.send("Aucun types d'alerte présent en base de données.")
        } else {
            // Sinon, on renvoie le résultat de notre requête
            res.json(result, 200)
        }
    })
    //en cas d'erreur, on passe dans le catch
    .catch(error => {
        //On définit un status d'erreur et un message a renvoyer
        const message = "La liste de type d'alerte n'a pas pu être récupérée. Réessayez dans quelques instants."
        res.status(500).json({
            message,
            data: error
        })
    })

}

const getOneById = (req, res) => {
    alertTypesTable.findByPk(req.params.id)
        .then(alert_types => {
            if (!alert_types) {
                return res.status(404).json({ message: "Aucun type d'alerte n'a été trouvé" })
            }
            res.status(200).json(alert_types)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération d'un type d'alerte."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const createOne = (req, res) => {
    alertTypesTable.create(req.body)

        .then(alert_types => {
            const message = "Un type d'alerte est ajouté à la base de données."
            res.status(201).json({
                message,
                data: alert_types
            })
        })

        .catch(error => {
            const message = "Une erreur a eu lieu lors de l'insertion de type d'alerte en base de donnée."
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
    alertTypesTable.update(
        req.body,
        {
            where: {
                id: req.params.id
            },
            returning: true,
        })
        .then(result => {
            const message = "Votre type d'alerte a été mis à jour."
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
    alertTypesTable.findByPk(req.params.id)
    .then(alert_types => {
        if(!alert_types) {
            return res.status(404).json({message: "Aucun type d'alerte n'a été trouvé"})
        }

    alertTypesTable.destroy({
            where: {
                id: req.params.id
            }
        })

        .then(r => {
            const message = "le type d'alerte a bien été supprimé."
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

// const deleteAll = (req, res) => {
//     alertTypesTable.destroy({
//             truncate: true
//         })
//         .then(r => {
//             const message = "La table a bien été vidé."
//             res.status(200).send(message)
//         })
//         .catch(error => {
//             const message = "Une erreur a eu lieu lors de la suppression."
//             res.status(500).json({
//                 message,
//                 error
//             })
//         })
// }

const alertTypesController = {
    getAll,
    getOneById,
    createOne,
    updateOneById,
    deleteOneById,
    // deleteAll
}

module.exports = alertTypesController