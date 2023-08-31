//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
//On initialise une nouvelle constante qui représente le modèle qui nous intéresse. Ici, la table lessons
const lessonsTable = db['lessons'];


//On déclare toutes les méthodes
const getAll = (req, res) => {

    //On utilise l'ORM pour SELECT toute la table
    lessonsTable.findAll()

        //On utilise les promesses pour gérer les résultats de la requête.
        .then(result => {
            if (result.length === 0) {

                //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
                res.send("Aucune lesson n'est présente en base de données.")
            } else {
                // Sinon, on renvoie le résultat de notre requête
                res.json(result, 200)
            }
        })
        //en cas d'erreur, on passe dans le catch
        .catch(error => {
            //On définit un status d'erreur et un message a renvoyer
            const message = "La liste des lessons n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error
            })
        })

}


const getOneById = (req, res) => {
    lessonsTable.findByPk(req.params.id)
    
        .then(lesson => {
            if (!lesson) {
                return res.status(404).json({ message: "Aucune lesson n'a été trouvée" })
            }
            res.status(200).json(lesson)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération de la lesson."
            res.status(500).json({
                message,
                data: error
            })
        })
}


const getOneByUserId = (req, res) => {
    lessonsTable.findByPk(req.params.id, {
        include: ['users']
    } )
        .then(lesson => {
            if (!lesson) {
                return res.status(404).json({ message: "Aucune lesson n'a été trouvée pour cet utilisateur" })
            }
            res.status(200).json(lesson)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération de la lesson de cet utilisateur."
            res.status(500).json({
                message,
                data: error
            })
        })
}













const createLesson = (req, res) => {
    const { lesson_datetime, id_room, id_user, id_subject, id_timeslot, id_class } = req.body;

    lessonsTable.create({
        lesson_datetime: lesson_datetime,
        id_room: id_room,
        id_user: id_user,
        id_subject: id_subject,
        id_timeslot: id_timeslot,
        id_class: id_class
    })
    .then(result => {
        res.status(201).json({
            message: "Nouvelle leçon créée avec succès",
            data: result
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Une erreur s'est produite lors de la création de la leçon",
            data: error
        });
    });
};


const updateOneById = (req, res) => {
    // Corrigé la méthode update
    lessonsTable.findByPk(req.params.id)
      .then(lesson => {
        if (!lesson) {
          return res.status(404).json({ message: "Aucune lesson n'a été trouvée" });
        }
  
        lessonsTable.update(req.body, {
          where: {
            id: req.params.id
          }
        })
        .then(result => {
          res.status(201).json({ message: "lesson correctement mise à jour." });
        })
        .catch(error => {
          // Gestion des erreurs
        });
      });
  };


const deleteOneById = (req, res) => {
    lessonsTable.findByPk(req.params.id)
    .then(lesson => {
        if(!lesson) {
            return res.status(404).json({message: "Aucune lesson n'a été trouvée"})
        }

    lessonsTable.destroy({
            where: {
                id: req.params.id
            }
        })

        .then(r => {
            const message = "La lesson a bien été supprimée."
            res.status(200).send(message)
        })

        .catch(error => {
            const message = "Une erreur a eu lieu lors de la suppression de la lesson."
            res.status(500).json({
                message,
                error
            })
        })
    })
}

const deleteAll = (req, res) => {
    lessonsTable.destroy({
            truncate: true
        })
        .then(r => {
            const message = "La table a bien été vidé."
            res.status(200).send(message)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la suppression."
            res.status(500).json({
                message,
                error
            })
        })
}

 

const updateLesson = async (req, res) => {
    const { id } = req.params;
    const { lesson_datetime, lesson_endtime, id_class } = req.body;
    try {
      const updatedLesson = await lessonsTable.update({
        lesson_datetime,
        lesson_endtime,
        id_class,
      }, {
        where: { id }
      });
      res.status(200).json(updatedLesson);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour' });
    }
  };
  

const lessonsController = {
    createLesson,  
    updateOneById,
    deleteOneById,
    getAll,
    getOneById,   
    deleteAll,
    updateLesson
  };
  
  module.exports = lessonsController;