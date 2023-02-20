const db = require('../models/index');
const room_types = require('../models/room_types');
const roomTypesTable = db['room_types'];

const getAll = (req,res)=> {

    //On utilise l'ORM pour SELECT toute la table
    roomTypesTable.findAll()

    //On utilise les promesses pour gérer les résultats de la requête.
    .then(result => {
        if (result.length === 0) {

            //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
            res.json({Message : "Aucun types de salle n'est présent en base de données."})
        } else {
            // Sinon, on renvoie le résultat de notre requête
            res.json(result, 200)
        }
    })
    //en cas d'erreur, on passe dans le catch
    .catch(error => {
        //On définit un status d'erreur et un message a renvoyer
        const message = "La liste de type de salles n'a pas pu être récupérée. Réessayez dans quelques instants."
        res.status(500).json({
            message,
            data: error
        })
    })

}

const getOneById = (req, res) => {
    roomTypesTable.findByPk(req.params.id)
        .then(room_types => {
            if (!room_types) {
                return res.status(404).json({ message: "Aucun type de salles n'a été trouvé" })
            }
            res.status(200).json(room_types)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération d'un type de salle."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const createOne = (req, res) => {
    roomTypesTable.create(req.body)

        .then(room_types => {
            const message = "Un type de salle est ajouté à la base de données."
            res.status(201).json({
                message,
                data: alert_types
            })
        })

        .catch(error => {
            const message = "Une erreur a eu lieu lors de l'insertion de type de salle en base de donnée."
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
    roomTypesTable.update(
        req.body,
        {
            where: {
                id: req.params.id
            },
            returning: true,
        })
        .then(result => {
            const message = "Votre type de salle a été mis à jour."
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
    roomTypesTable.findByPk(req.params.id)
    .then(room_types => {
        if(!room_types) {
            return res.status(404).json({message: "Aucun type de salle n'a été trouvé"})
        }

    roomTypesTable.destroy({
            where: {
                id: req.params.id
            }
        })

        .then(r => {
            const message = "le type de salle a bien été supprimé."
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


const roomTypesController = {
    getAll,
    getOneById,
    createOne,
    updateOneById,
    deleteOneById,
}

module.exports = roomTypesController