//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
const users_subjectsTable = db['users_subjects'];

const getAll = (req, res) => {
    users_subjectsTable.findAll()
        .then(users_subjects => {
            if (!users_subjects) {
                return res.status(404).json({ message: "Aucun utilisateur relié à une matiére n'a été trouvé" })
            }
            res.status(200).json(users_subjects)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération d'un utilisateur relié à une matiére."
            res.status(500).json({
                message,
                data: error.message
            })
        })
}

const getOneById = (req, res) => {
    users_subjectsTable.findByPk(req.params.id)
        .then(users_subjects => {
            if (!users_subjects) {
                return res.status(404).json({ message: "Aucun utilisateur relié à une matiére n'a été trouvé" })
            }
            res.status(200).json(users_subjects)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération d'un utilisateur relié à une matiére."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const createOne = (req, res) => {
    users_subjectsTable.create(req.body)

        .then(users_subjects => {
            const message = "Un utilisateur relié à une matiére est ajouté à la base de données."
            res.status(201).json({
                message,
                data: users_subjects
            })
        })

        .catch(error => {
            const message = "Une erreur a eu lieu lors de l'insertion d'un utilisateur relié à une matiére en base de donnée."
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
    users_subjectsTable.update(
        req.body,
        {
            where: {
                id: req.params.id
            },
            returning: true,
        })
        .then(result => {
            const message = "Votre utilisateur relié à une matiére a été mis à jour."
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
    users_subjectsTable.findByPk(req.params.id)
    .then(users_subjects => {
        if(!users_subjects) {
            return res.status(404).json({message: "Aucun utilisateur relié à une matiére n'a été trouvé"})
        }

    users_subjectsTable.destroy({
            where: {
                id: req.params.id
            }
        })

        .then(r => {
            const message = "l'utilisateur relié à une matiére a bien été supprimé."
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

const users_subjectsController = {
    getAll,
    getOneById,
    createOne,
    updateOneById,
    deleteOneById
}

module.exports = users_subjectsController