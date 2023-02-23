//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
const usersTable = db['users'];
const classes = db['classes'];

const getAllUsers = (req,res)=> {
        
        //On utilise l'ORM pour SELECT toute la table
        usersTable.findAll({
            include: [{
                model: classes,
                as: 'classes',
            }],
        })

        //On utilise les promesses pour gérer les résultats de la requête.
        .then(result => {
            if (result.length === 0) {

                //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
                res.json({Message : "Aucun utilisateur présent en base de données."})
            } else {
                // Sinon, on renvoie le résultat de notre requête
                res.json(result, 200)
            }
        })
        //en cas d'erreur, on passe dans le catch
        .catch(error => {
            //On définit un status d'erreur et un message a renvoyer
            const message = "La liste des utilisateurs n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error.message
            })
        })

}

const getOneById = (req, res) => {
    usersTable.findByPk(req.params.id)
        .then(users => {
            if (!users) {
                return res.status(404).json({ message: "Aucun utilisateur n'a été trouvé" })
            }
            res.status(200).json(users)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération d'un utilisateur."
            res.status(500).json({
                message,
                data: error.message
            })
        })
}


const createOne = (req, res) => {
    usersTable.create(req.body)

        .then(users => {
            const message = "Un utilisateur est ajouté à la base de données."
            res.status(201).json({
                message,
                data: users
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
            usersTable.update(
                req.body,
                {
                    where: {
                        id: req.params.id
                    },
                    returning: true,
                })
                .then(result => {
                    const message = "Vos données utilisateur sont correctement mis à jour."
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
    usersTable.findByPk(req.params.id)
    .then(users => {
        if(!users) {
            return res.status(404).json({message: "Aucun utilisateur n'a été trouvé"})
        }

    usersTable.destroy({
            where: {
                id: req.params.id
            }
        })

        .then(r => {
            const message = "L'utilisateur a bien été supprimé."
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
    rolesTable.destroy({
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

const getallUsersClasse = (req, res) => {
    
}

const userController = {
    getAllUsers,
    getOneById,
    createOne,
    updateOneById,
    deleteOneById,
    deleteAll
}

module.exports = userController