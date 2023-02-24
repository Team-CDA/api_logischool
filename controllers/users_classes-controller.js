//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
//On initialise une nouvelle constante qui représente le modèle qui nous intéresse. Ici, la table groups
const users_classesTable = db['users_classes'];


//On déclare toutes les méthodes
const getAll = (req, res) => {

    //On utilise l'ORM pour SELECT toute la table
    users_classesTable.findAll()

        //On utilise les promesses pour gérer les résultats de la requête.
        .then(result => {
            if (result.length === 0) {

                //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
                res.json({Message : "Aucune classe d'utilisateur présent en base de données."})
            } else {
                // Sinon, on renvoie le résultat de notre requête
                res.json(result, 200)
            }
        })
        //en cas d'erreur, on passe dans le catch
        .catch(error => {
            console.log(error)
            //On définit un status d'erreur et un message a renvoyer
            const message = "La liste des classes utilisateurs n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error
            })
        })

}

const getOneById = (req, res) => {
    users_classesTable.findByPk(req.params.id)
        .then(user_group => {
            if (!user_group) {
                return res.status(404).json({ message: "Aucune classe d'utilisateur n'a été trouvé" })
            }
            res.status(200).json(user_group)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération du classe d'utilisateur."
            res.status(500).json({
                message,
                data: error
            })
        })
}




const createOne = (req, res) => {
    users_classesTable.create(req.body)

        .then(user_group => {
            const message = "Classe utilisateur ajouté à la base de données."
            res.status(201).json({
                message,
                data: user_group
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
    users_classesTable.findByPk(req.params.id)
        .then(user_group => {
            if(!user_group) {
                return res.status(404).json({message: "Aucun classe n'a été trouvé"})
            }
        
            users_classesTable.update(
                req.body,
                    {
                    where: {
                        id: req.params.id
                    },
                    returning: true,
                })
                .then(result => {
                    const message = "Classe utilisateur correctement mis à jour."
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
        });
}


const deleteOneById = (req, res) => {
    users_classesTable.findByPk(req.params.id)
    .then(user_group => {
        if(!user_group) {
            return res.status(404).json({message: "Aucun classe d'utilisateurs n'a été trouvé"})
        }

    users_classesTable.destroy({
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
    users_classesTable.destroy({
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
const users_classController = {
    createOne,
    updateOneById,
    deleteOneById,
    getAll,
    getOneById,
    deleteAll
}


module.exports = users_classController