//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
//On initialise une nouvelle constante qui représente le modèle qui nous intéresse. Ici, la table lessons
const lessonsTable = db['lessons'];


//On déclare toutes les méthodes
const getAll = (req, res) => {

    //On utilise l'ORM pour SELECT toute la table
    lessonsTable.findAll()

        //On utilise les promesses pour gérer les résultats de la requête.
        .then(result => {
            if (result.length === 0) {

                //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
                res.json({Message : "Aucune lesson présente en base de données."})
            } else {
                // Sinon, on renvoie le résultat de notre requête
                res.json(result, 200)
            }
        })
        //en cas d'erreur, on passe dans le catch
        .catch(error => {
            //On définit un status d'erreur et un message a renvoyer
            const message = "La liste des lessons n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error
            })
        })

}

const getOneById = (req, res) => {
    lessonsTable.findByPk(req.params.id)
        .then(lesson => {
            if (!lesson) {
                return res.status(404).json({ message: "Aucun lesson n'a été trouvée" })
            }
            res.status(200).json(lesson)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération de la lesson."
            res.status(500).json({
                message,
                data: error
            })
        })
}




const createOne = (req, res) => {
    lessonsTable.create(req.body)

        .then(lesson => {
            const message = "Lesson ajoutée à la base de données."
            res.status(201).json({
                message,
                data: lesson
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
    lessonsTable.findByPk(req.params.id)
        .then(lesson => {
            if(!lesson) {
                return res.status(404).json({message: "Aucune lesson n'a été trouvée"})
            }
        
            lessonsTable.update(
                req.body,
                    {
                    where: {
                        id: req.params.id
                    },
                    returning: true,
                })
                .then(result => {
                    const message = "Lesson correctement mise à jour."
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
    lessonsTable.findByPk(req.params.id)
    .then(lesson => {
        if(!lesson) {
            return res.status(404).json({message: "Aucune lesson n'a été trouvée"})
        }

    lessonsTable.destroy({
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
    lessonsTable.destroy({
            truncate: true
        })
        .then(r => {
            const message = "La table a bien été vidée."
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
const lessonController = {
    createOne,
    updateOneById,
    deleteOneById,
    getAll,
    getOneById,
    deleteAll
}


module.exports = lessonController