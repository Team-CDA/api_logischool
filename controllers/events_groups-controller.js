//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
const events_groupsTable = db['events_group'];
const eventsTable = db['events'];
const groupsTable = db['groups'];

const getAll = (req, res) => {
    
    events_groupsTable.findAll(
        {
            include: [{
                model: eventsTable,
                as: 'events',
            },
            {
                model: groupsTable,
                as: 'groups',
            }],
        }
    )
        .then(events_groups => {
            if (!events_groups) {
                return res.status(404).json({ message: "Aucun événements de groupe n'a été trouvé" })
            }
            res.status(200).json(events_groups)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération d'événements de groupe"
            res.status(500).json({
                message,
                data: error.message
            })
        })
}

const getOneById = (req, res) => {
    events_groupsTable.findByPk(req.params.id)
        .then(events_groups => {
            if (!events_groups) {
                return res.status(404).json({ message: "Aucun événements de groupe n'a été trouvé" })
            }
            res.status(200).json(events_groups)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération d'événements de groupe."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const createOne = (req, res) => {
    events_groupsTable.create(req.body)

        .then(events_groups => {
            const message = "Un événements de groupe est ajouté à la base de données."
            res.status(201).json({
                message,
                data: events_groups
            })
        })

        .catch(error => {
            const message = "Une erreur a eu lieu lors de l'insertion d'événements de groupe en base de donnée."
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
    events_groupsTable.update(
        req.body,
        {
            where: {
                id: req.params.id
            },
            returning: true,
        })
        .then(result => {
            const message = "Votre événement de groupe a été mis à jour."
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
    events_groupsTable.findByPk(req.params.id)
    .then(events_groups => {
        if(!events_groups) {
            return res.status(404).json({message: "Aucun événement de groupe n'a été trouvé"})
        }

        events_groupsTable.destroy({
            where: {
                id: req.params.id
            }
        })

        .then(r => {
            const message = "l'événement de groupe a bien été supprimé."
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

const events_groupsController = {
    getAll,
    getOneById,
    updateOneById,
    createOne,
    deleteOneById
}

module.exports = events_groupsController