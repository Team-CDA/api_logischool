//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
//On initialise une nouvelle constante qui représente le modèle qui nous intéresse. Ici, la table rooms
const roomsTable = db['rooms'];


//On déclare toutes les méthodes
const getAll = (req, res) => {

    //On utilise l'ORM pour SELECT toute la table
    roomsTable.findAll()

        //On utilise les promesses pour gérer les résultats de la requête.
        .then(result => {
            if (result.length === 0) {

                //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
                res.json({Message : "Aucune salle n'est présente en base de données."})
            } else {
                // Sinon, on renvoie le résultat de notre requête
                res.json(result, 200)
            }
        })
        //en cas d'erreur, on passe dans le catch
        .catch(error => {
            //On définit un status d'erreur et un message a renvoyer
            const message = "La liste des salles n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error
            })
        })

}

const getOneById = (req, res) => {
    roomsTable.findByPk(req.params.id)
        .then(room => {
            if (!room) {
                return res.status(404).json({ message: "Aucune salle n'a été trouvée" })
            }
            res.status(200).json(room)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération de la salle."
            res.status(500).json({
                message,
                data: error
            })
        })
}




const createOne = (req, res) => {
    roomsTable.create(req.body)

        .then(room => {
            const message = "Salle ajoutée à la base de données."
            res.status(201).json({
                message,
                data: room
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
    roomsTable.findByPk(req.params.id)
        .then(room => {
            if(!room) {
                return res.status(404).json({message: "Aucune room n'a été trouvé"})
            }
        
            roomsTable.update(
                req.body,
                    {
                    where: {
                        id: req.params.id
                    },
                    returning: true,
                })
                .then(result => {
                    const message = "La salle a correctement été mise à jour."
                    res.status(201).json({
                        message
                    });
                })
                .catch(error => {
                    const message = "Une erreur a eu lieu lors de la modification de la salle ."
                    if (error instanceof ValidationError) {
                        res.status(400).send(error.errors[0].message)
                    } else {
                        res.status(500).json({
                            message,
                            error
                        })
                    }
                });
        });
}


const deleteOneById = (req, res) => {
    roomsTable.findByPk(req.params.id)
    .then(room => {
        if(!room) {
            return res.status(404).json({message: "Aucune salle n'a été trouvée"})
        }

    roomsTable.destroy({
            where: {
                id: req.params.id
            }
        })

        .then(r => {
            const message = "L'élément a bien été supprimé."
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

const deleteAll = (req, res) => {
    roomsTable.destroy({
            truncate: true
        })
        .then(r => {
            const message = "La table a bien été vidé."
            res.status(200).send(message)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la suppression."
            res.status(500).json({
                message,
                error
            })
        })
}

//On ajoute toutes les méthodes dans un objet pour faciliter l'export
const roomsController = {
    createOne,
    updateOneById,
    deleteOneById,
    getAll,
    getOneById,
    deleteAll
}


module.exports = roomsController