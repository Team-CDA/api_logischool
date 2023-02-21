//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
const subjects = require('../models/subjects');
const subjectsTable = db['subjects'];

const getAll = (req, res) => {
    subjectsTable.findAll()
    .then(subjects => {
        if (!subjects) {
            return res.status(404).json({ message: "Aucune matière n'a été trouvé" })
        }
        res.status(200).json(subjects)
    })
    .catch(error => {
        const message = "Une erreur a eu lieu lors de la récupération d'une matière."
        res.status(500).json({
            message,
            data: error.message
        })
    })
}

const getOneById = (req, res) => {
    subjectsTable.findByPk(req.params.id)
        .then(subjects => {
            if (!subjects) {
                return res.status(404).json({ message: "Aucune matière n'a été trouvé" })
            }
            res.status(200).json(subjects)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération d'une matière."
            res.status(500).json({
                message,
                data: error.message
            })
        })
}

const createOne = (req, res) => {
    subjectsTable.create(req.body)

        .then(subjects => {
            const message = "Une matière est ajouté à la base de données."
            res.status(201).json({
                message,
                data: subjects
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
    subjectsTable.update(
        req.body,
        {
            where: {
                id: req.params.id
            },
            returning: true,
        })
        .then(result => {
            const message = "Votre matière a été mis à jour."
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
    subjectsTable.findByPk(req.params.id)
    .then(subjects => {
        if(!subjects) {
            return res.status(404).json({message: "Aucune matière n'a été trouvé"})
        }

        subjectsTable.destroy({
            where: {
                id: req.params.id
            }
        })

        .then(r => {
            const message = "la matière a bien été supprimé."
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

const subjectsController = {
    getAll,
    getOneById,
    createOne,
    updateOneById,
    deleteOneById
}

module.exports = subjectsController