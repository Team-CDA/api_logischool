//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
const genders = require('../models/genders');
const gendersTable = db['genders'];

const getGenderAll = (req, res) => {
        gendersTable.findAll()
        .then(genders => {
            if (!genders) {
                return res.status(404).json({ message: "Aucun genre n'a été trouvé" })
            }
            res.status(200).json(genders)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération d'un genre."
            res.status(500).json({
                message,
                data: error.message
            })
        })
}

const getOneById = (req, res) => {
    gendersTable.findByPk(req.params.id)
        .then(genders => {
            if (!genders) {
                return res.status(404).json({ message: "Aucun genre n'a été trouvé" })
            }
            res.status(200).json(genders)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération du genre."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const createOne = (req, res) => {
    gendersTable.create(req.body)

        .then(alert_types => {
            const message = "Un genre est ajouté à la base de données."
            res.status(201).json({
                message,
                data: alert_types
            })
        })

        .catch(error => {
            const message = "Une erreur a eu lieu lors de l'insertion de genre en base de donnée."
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
    gendersTable.update(
        req.body,
        {
            where: {
                id: req.params.id
            },
            returning: true,
        })
        .then(result => {
            const message = "Votre genre a été mis à jour."
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
    gendersTable.findByPk(req.params.id)
    .then(genders => {
        if(!genders) {
            return res.status(404).json({message: "Aucun genre n'a été trouvé"})
        }

    gendersTable.destroy({
            where: {
                id: req.params.id
            }
        })

        .then(r => {
            const message = "le genre a bien été supprimé."
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

const gendersController = {
    getGenderAll,
    getOneById,
    createOne,
    updateOneById,
    deleteOneById
}

module.exports = gendersController