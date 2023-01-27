const db = require('../models/index');
const { ValidationError } = require('sequelize');
const buildingsTable = db['buildings'];
const { Op } = require("sequelize");


const getAll = (req, res) => {

    buildingsTable.findAll()
        .then(result => {
            if (result.length === 0) {
                res.send("Aucun building présent en base de données.")
            } else {
                res.json(result, 200)
            }
        })
        .catch(error => {
            const message = "La liste des buildings n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const getOneById = (req, res) => {


    buildingsTable.findByPk(req.params.id)
        .then(building => {
            if (!building) {
                return res.status(404).json({ message: "Aucune building n'a été trouvé" })
            }
            res.status(200).json(building)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération du building."
            res.status(500).json({
                message,
                data: error.message
            })
        })
}

const getByEstablishment = async (req, res) => {

    await roomsTable.findAll({
        where: {id_establishment: req.params.id}
    })
        .then(result => {
            if (result.length === 0) {
                res.send("Aucun building présent en base de données.")
            } else {
                res.json(result, 200)
            }
        })
        .catch(error => {
            const message = "La liste des buildings n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error.message
            })
        })
}


const updateOneById = (req, res) => {

    console.log(req.body)
    let isUpdatePossible = true
    buildingsTable.findAll({
        where: {
            id: {[Op.ne]: req.body.id},
            name: req.body.name,
            id_establishment: req.body.id_establishment
        }
    })
    .then(r => {
        if (r.length != 0 ){
            isUpdatePossible = false
        }

        if (isUpdatePossible){

            buildingsTable.update(
                {
                name: req.body.name,
                id_establishment: req.body.id_establishment,
                updatedAt: new Date()
                },
                {
                    where : {id: req.body.id}
                })
                .then(result => {
                    const message = "Mise à jour réussie"
                    res.status(201).json({
                    message,
                    data: result
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
                
        } else {
            res.status(400).send('Impossible de modifier avec ces données. Il existe déjà cette combinaison de nom + établissement')
        }

    })
    .catch(error => {
        console.log(error)
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

const deleteOneById = (req, res) => {
    buildingsTable.findByPk(req.params.id)
    .then(building => {
        if(!building) {
            return res.status(404).json({message: "Aucune building n'a été trouvé"})
        }

    buildingsTable.destroy({
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

const buildingsController = {
    getAll,
    getOneById,
    getByEstablishment,
    updateOneById,
    deleteOneById
}

module.exports = buildingsController