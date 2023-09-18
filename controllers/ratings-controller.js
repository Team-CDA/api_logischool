const { use } = require("bcrypt/promises");
const db = require("../models/index");
const { ValidationError, Op } = require("sequelize");
const ratingTable = db["ratings"];
const professorsClassesTable = db["professors_classes"];
const Users = db["users"];
const UsersClasses = db["users_classes"];


const getAllRatings = (req, res) => {
    ratingTable.findAll()
    .then(ratings => {
        res.status(200).json({ ratings });
    })
    .catch(error => {
        res.status(500).json({ message: "Une erreur s'est produite", error });
    });
};

const getOneById = (req, res) => {
    const studentId = req.params.id;

    if (!studentId) {
        return res.status(400).json({ message: "L'ID de l'élève est requis" });
    }

    ratingTable.findAll({ where: { id_student: studentId } })
    .then(ratings => {
        res.status(200).json({ ratings });
    })
    .catch(error => {
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des appréciations", error });
    });
};

const createRating = (req, res) => {
  const { ...data } = req.body;
  const userId = req.body.id_teacher;
  console.log("blu", data);

  Users.findOne({ where: { id: userId }, logging: console.log }).then(user => {
      if (user.id_role !== 5) {
          return res.status(403).json({ message: "Vous n'avez pas la permission de réaliser cette action." });
      }

      Users.findOne({ where: { id: data.id_student } }).then(student => {
          if (!student) {
              return res.status(404).json({ message: "Élève non trouvé." });
          }

          // Chercher dans la table users_classes pour obtenir l'id_class de cet élève
          UsersClasses.findOne({ where: { id_user: student.id } }).then(userClass => {
              if (!userClass) {
                  return res.status(404).json({ message: "Classe de l'élève non trouvée." });
              }

              const studentClassId = userClass.id_class;

              professorsClassesTable.findOne({
                  where: {
                      id_professor: userId,
                      id_class: studentClassId
                  }
              }).then(professorClassAssociation => {
                  if (!professorClassAssociation) {
                      return res.status(403).json({ message: "Vous n'avez pas la permission de réaliser cette action pour cet élève et cette matière." });
                  }

                  ratingTable.create(data)
                  .then(rating => {
                      res.status(201).json(rating);
                  })
                  .catch(error => {
                      res.status(400).json({ message: "Erreur lors de la création", error });
                  });

              }).catch(error => {
                  console.error("Erreure détaillée:", error);
                  res.status(500).json({ message: "Erreur lors de la vérification de l'association professeur-classe", error });
              });

          }).catch(error => {
              res.status(500).json({ message: "Erreur lors de la récupération de la classe de l'élève", error });
          });

      }).catch(error => {
          console.log("Erreur détaillée:", error);
          res.status(500).json({ message: "Erreur lors de la récupération de l'élève", error });
      });

  }).catch(error => {
      console.error("Erreur détaillée:", error);
      res.status(500).json({ message: "Erreur lors de la vérification de l'utilisateur", error });
  });
};


const updateRating = (req, res) => {
    const ratingId = req.params.id;
    const data = req.body;
    console.log("blu", ratingId);

    ratingTable.update(data, { where: { id: ratingId } })
    .then(() => {
        res.status(200).json({ message: "Appréciation mise à jour avec succès." });
    })
    .catch(error => {
      console.error("Erreur détaillée lors de la mise à jour de l'appréciation:", error);
      res.status(500).json({ message: "Erreur lors de la mise à jour de l'appréciation.", error });
  });
};

const deleteRating = (req, res) => {
    const ratingId = req.params.id;

    ratingTable.destroy({ where: { id: ratingId } })
    .then(() => {
        res.status(200).json({ message: "Appréciation supprimée avec succès." });
    })
    .catch(error => {
        res.status(500).json({ message: "Erreur lors de la suppression de l'appréciation.", error });
    });
};

const ratingController = {
    getAllRatings,
    getOneById,
    createRating,
    updateRating,
    deleteRating
};

module.exports = ratingController;
