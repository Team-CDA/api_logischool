const db = require('../models/index');
const schedule = db['schedule'];


// ------------------------- Fonctions utiles ---------------------------- //


const getAll = (req, res) => {

    schedule.findAll()
        .then(result => {
            if (result.length === 0) {
                res.send("Aucun emploi du temps n'est  présent en base de données.")
            } else {
                res.json(result, 200)
            }
        })
        .catch(error => {
            const message = "La liste des emplois du temps n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const getScheduleByUser = (req, res) => {

    schedule.findAll({
            where: {
                users_id: req.params.id
            }
        })
        .then(result => {
            if (result.length === 0) {
                res.send("Aucun emploi du temps n'est présent en base de données.")
            } else {
                res.json(result, 200)
            }
        })
        .catch(error => {
            const message = "La liste des emploi du temps n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error
            })
        })
}










const scheduleController = {
    getAll,
    getScheduleByUser,
}

module.exports = scheduleController