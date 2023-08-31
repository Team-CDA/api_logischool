const db = require('../models/index');
const schedule = db['schedule'];


// ------------------------- Fonctions utiles : 

// ----------------------------


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

    schedule.findAll({where: { users_id: req.params.id}})
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




const createSchedule = async (req, res) => {
    try {
      // Récupérez les données de la requête
      const { users_id, lesson_date, duration, /* autres champs */ } = req.body;
  
      // Effectuez les insertions dans les tables nécessaires
      // ...
  
      // Envoyez une réponse
      res.status(201).json({ message: "Événement créé avec succès" });
    } catch (error) {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la création de l'événement",
        data: error,
      });
    }
  };
  

  // ...

  const getScheduleByClass = (req, res) => {
    const classId = req.params.classId;
  
    schedule.findAll({
        where: { class_id: classId },
        attributes: [
            'users_id', 
            'role_user', 
            'lesson_id', 
            'lesson_date', 
            'duration', 
            'subject_name', 
            'class_id', 
            'classes_name', 
            'class_type', 
            'rooms_name', 
            'room_type', 
            'buildings_name'
        ]
    })
    .then(result => {
        if (result.length === 0) {
            res.status(200).send("Aucun emploi du temps n'est présent pour cette classe en base de données.");
        } else {
            res.status(200).json(result);
        }
    })
    .catch(error => {
        const message = "La liste des emplois du temps n'a pas pu être récupérée. Réessayez dans quelques instants.";
        res.status(500).json({
            message,
            data: error
        });
    });
};


  const scheduleController = {
    getAll,
    getScheduleByUser,
    createSchedule,
    getScheduleByClass,  // Ajout de la nouvelle méthode
  };
  
  module.exports = scheduleController;
  


