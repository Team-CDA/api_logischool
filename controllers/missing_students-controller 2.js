//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
//On initialise une nouvelle constante qui représente le modèle qui nous intéresse. Ici, la table reports
const missing_students = db['missing_students'];



//On déclare toutes les méthodes
const getAll = (req, res) => {

    //On utilise l'ORM pour SELECT toute la table
    missing_students.findAll()

        //On utilise les promesses pour gérer les résultats de la requête.
        .then(result => {
            if (result.length === 0) {

                //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
                res.json({Message : "Aucun élève absent en base de données."})
            } else {
                // Sinon, on renvoie le résultat de notre requête
                res.json(result, 200)
            }
        })
        //en cas d'erreur, on passe dans le catch
        .catch(error => {
            //On définit un status d'erreur et un message a renvoyer
            const message = "La liste des élèves absents n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error
            })
        })

}

const getOneById = (req, res) => {
    missing_students.findByPk(req.params.id)
        .then(report => {
            if (!report) {
                return res.status(404).json({ message: "Aucun absence n'a été trouvée" })
            }
            res.status(200).json(report)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération de l'absence."
            res.status(500).json({
                message,
                data: error
            })
        })
}


const getAllByIdUser = (req, res) => {
    missing_students.findAll({where: {id_user: req.params.id}})
    .then(result => {
            if (result.length === 0) {
                res.json({Message : "Aucune absence pour cet utilisateur en base de données."})
            } else {
                res.json(result, 200)
            }
        })
        .catch(error => {
            const message = "La liste des absences de l'utilisateur n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const getOneByIdUser = (req, res) => {
    const { userId, absenceId } = req.params;

    missing_students.findOne({ where: { id_user: userId, id: absenceId } })
        .then(absence => {
            if (!absence) {
                return res.status(404).json({ message: "Aucune absence n'a été trouvée pour cet utilisateur" })
            }
            res.status(200).json(absence)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération de l'absence."
            res.status(500).json({
                message,
                data: error
            })
        })
}


const getAllUnjustifiedByUserId = (req, res) => {
    const { userId } = req.params;

    missing_students.findAll({ where: { id_user: userId, justified: 0 } })
        .then(absences => {
            if (!absences) {
                return res.status(404).json({ message: "Aucune absence non justifiée n'a été trouvée pour cet utilisateur" })
            }
            res.status(200).json(absences)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération des absences non justifiées."
            res.status(500).json({
                message,
                data: error
            })
        })
}





const createOne = (req, res) => {
    missing_students.create(req.body)

        .then(report => {
            const message = "absence ajoutée à la base de données."
            res.status(201).json({
                message,
                data: report
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

const updateOneById = (req, res) => {
    missing_students.findByPk(req.params.id)
        .then(report => {
            if(!report) {
                return res.status(404).json({message: "Aucune absence n'a été trouvée"})
            }
        
            missing_students.update(
                req.body,
                    {
                    where: {
                        id: req.params.id
                    },
                    returning: true,
                })
                .then(result => {
                    const message = "Absence correctement mise à jour."
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
        });
}
 

const getAbsencesWithSchedule = (req, res) => {
    const { userId } = req.params;
  
    missing_students.findAll({
      where: { id_user: userId },
      include: [{ model: Schedule, where: { lesson_id: Sequelize.col('missing_students.id_lesson') } }]
    })
      .then(absences => {
        if (!absences) {
          return res.status(404).json({ message: "Aucune absence trouvée pour cet utilisateur" })
        }
        res.status(200).json(absences)
      })
      .catch(error => {
        const message = "Une erreur a eu lieu lors de la récupération des absences et des informations de l'emploi du temps."
        res.status(500).json({
          message,
          data: error
        })
      })
  }
  
  


//On ajoute toutes les méthodes dans un objet pour faciliter l'export
const missing_studentsController = {
    createOne,
    updateOneById,
    getAll,
    getOneById,
    getAllByIdUser,
    getOneByIdUser,
    getAllUnjustifiedByUserId,
    getAbsencesWithSchedule, 

}


module.exports = missing_studentsController