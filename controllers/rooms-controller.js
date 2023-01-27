const db = require('../models/index');
const { ValidationError } = require('sequelize');
const buildings = db['buildings']
const roomsTable = db['rooms'];
const rooms_typeTable = db['rooms_types'];
const { Op } = require("sequelize");

// ------------------------- Fonctions utiles : 

// ----------------------------


const getAll = (req, res) => {

    roomsTable.findAll()
        .then(result => {
            if (result.length === 0) {
                res.send("Aucune room présente en base de données.")
            } else {
                res.json(result, 200)
            }
        })
        .catch(error => {
            const message = "La liste des rooms n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const getByBuilding = (req, res) => {

    roomsTable.findAll({where: { id_building: req.params.id}})
        .then(result => {
            if (result.length === 0) {
                res.send("Aucune room présente en base de données.")
            } else {
                res.json(result, 200)
            }
        })
        .catch(error => {
            const message = "La liste des rooms n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const getByNames = async (req, res) => {
    const buildingName = req.params.buildingName
    const roomName = req.params.roomName


    await roomsTable.findAll({
        where: {name: roomName},
        include: [{
            model: buildings,
            as: 'buildings',
            where: { name: buildingName}
        }],
    })
        .then(result => {
            if (result.length === 0) {
                res.send("Aucune room présente en base de données.")
            } else {
                res.json(result, 200)
            }
        })
        .catch(error => {
            const message = "La liste des rooms n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error.message
            })
        })
}


const getOneById = (req, res) => {


    roomsTable.findByPk(req.params.id)
        .then(room => {
            if (!room) {
                return res.status(404).json({ message: "Aucune room n'a été trouvé" })
            }
            res.status(200).json(room)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération de la room."
            res.status(500).json({
                message,
                data: error.message
            })
        })
}

const createOne = (req, res) => {
    roomsTable.create(req.body)

        .then(room => {
            const message = "Room ajoutée à la base de données."
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
const deleteOneById = (req, res) => {
    roomsTable.findByPk(req.params.id)
    .then(room => {
        if(!room) {
            return res.status(404).json({message: "Aucune room n'a été trouvé"})
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

const updateOneById = (req, res) => {

    console.log(req.body)
    let isUpdatePossible = true
    roomsTable.findAll({
        where: {
            id: {[Op.ne]: req.body.id},
            name: req.body.name,
            id_building: req.body.id_building
        }
    })
    .then(r => {
        if (r.length != 0 ){
            isUpdatePossible = false
        }

        if (isUpdatePossible){

            roomsTable.update(
                {
                name: req.body.name,
                id_building: req.body.id_building,
                id_room_type: req.body.id_room_type,
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
            res.status(400).send('Impossible de modifier avec ces données. Il existe déjà cette combinaison de room+bâtiment')
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


const roomsController = {
    getAll,
    getOneById,
    createOne,
    getByBuilding,
    getByNames,
    updateOneById,
    deleteOneById
}

module.exports = roomsController