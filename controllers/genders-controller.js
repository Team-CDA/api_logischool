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

const gendersController = {
    getGenderAll
}

module.exports = gendersController