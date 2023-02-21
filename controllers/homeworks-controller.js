const db = require('../models/index');
const { ValidationError } = require('sequelize');
const homeworksTable = db['homeworks'];
const { Op } = require("sequelize");

const getAll = (req, res) => {

    homeworksTable.findAll()
        .then(result => {
            if (result.length === 0) {
                res.send("Aucun résultat.")
            } else {
                res.json(result, 200)
            }
        })
        .catch(error => {
            const message = "Une erreur a eu lieu."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const getOneById = (req, res) => {

    homeworksTable.findByPk(req.params.id)
        .then(homework => {
            if (!homework) {
                return res.status(404).json({ message: "Aucune homework n'a été trouvé" })
            }
            res.status(200).json(homework)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération du homework."
            res.status(500).json({
                message,
                data: error.message
            })
        })
}

const deleteOneById = (req, res) => {
    homeworksTable.findByPk(req.params.id)
    .then(homework => {
        if(!homework) {
            return res.status(404).json({message: "Aucune homework n'a été trouvé"})
        }

    homeworksTable.destroy({
            where: {
                id: req.params.id
            }
        })

        .then(r => {
            const message = "L'élément a bien été supprimé."
            res.status(200).send(message)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu."
            if (error instanceof ValidationError) {
                res.status(400).send(error.errors[0].message)
            } else {
                res.status(500).json({
                    message,
                    error
                })
            }
        }) 
    })
} 

const updateOrCreate = (req, res) => {

    console.log(req.body)
console.log('e',req.file)
console.log('req.files: ', req.files)
    if (req.body.id){

    } else {
        homeworksTable.create({name: req.body.name, id_user: req.body.idUser, id_subject: req.body.idSubject})
        .then(homework => {

            const message = "Un homework est ajouté à la base de données."
            res.status(201).json({
                message,
                data: homework
            })
        })

        .catch(error => {
            const message = "Une erreur a eu lieu lors de l'insertion du homework en base de donnée."
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
    homeworksTable.findByPk(req.body.id)

        .then(homework => {
            if(!homework) {
                    homeworksTable.create(req.body)
            }
            const message = "Un type d'alerte est ajouté à la base de données."
            res.status(201).json({
                message,
                data: alert_types
            })
        })

        .catch(error => {
            const message = "Une erreur a eu lieu lors de l'insertion du homework en base de donnée."
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

const homeworksController = {
    getAll,
    getOneById,
    updateOrCreate
}

module.exports = homeworksController