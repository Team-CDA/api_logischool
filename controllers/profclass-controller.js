const db = require('../models/index');
const profclassTable = db['profclass'];
const userClasseTable = db['users_classes'];

const getAll = (req, res) => {

    profclassTable.findAll()
        .then(result => {
            if (result.length === 0) {
                res.send("Aucun professeur n'est présent en base de données.")
            } else {
                res.json(result, 200)
            }
        })
        .catch(error => {
            const message = "La liste des professeur n'a pas pu être récupérée."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const getAllByStudentId = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userClasseTable.findAll({
            where: {
                id_user: id
            },
            attributes: ['id_class']
        })
        const idClass = user[0].id_class
        const prof = await profclassTable.findAll({
            where: {
                id_class: idClass,
                role_user: 6
            },
            attributes: {exclude: ['id']}
        })
        if (prof) {
            res.status(200).send({message: 'selected',data: prof})
        }
    } catch (error) {
        res.status(400).send({error: error.message})
    }

}

const profclassController = {
    getAll,
    getAllByStudentId
}

module.exports = profclassController