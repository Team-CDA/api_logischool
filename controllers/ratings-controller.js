const db = require("../models/index");
const { ValidationError, Op } = require("sequelize");
const ratingTable = db["ratings"];

const getAllRatings = (req, res) => {
  // Exemple pour récupérer toutes les notes et appréciations
  Promise.all([
    ratingTable.findAll()
  ])
  .then(([ratings]) => {
    res.status(200).json({ ratings });
  })
  .catch((error) => {
    res.status(500).json({ message: "Une erreur s'est produite", error });
  });
};

const getOneById = (req, res) => {
  const studentId = req.params.id;

  if (!studentId) {
    return res.status(400).json({ message: "L'ID de l'élève est requis" });
  }

  // Trouver les appréciations pour l'élève spécifique
  ratingTable.findAll({
    where: { id_student: studentId },
    // include: [
    //   {
    //     model: db.users,
    //     as: "student"
    //   },
    //   {
    //     model: db.users,
    //     as: "teacher"
    //   }
    // ]
  })
  .then(ratings => {
    // Trouver les notes pour l'élève spécifique (en utilisant la clé correcte `id_student`)
    ratingTable.findAll({ where: { id_student: studentId } })
      .then(grades => {
        res.status(200).json({ ratings });
      })
      .catch(error => {
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des notes", error });
      });
  })
  .catch(error => {
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des appréciations", error });
  });
};


const createOne = (req, res) => {
  // Exemple pour créer une nouvelle note ou appréciation
  const { type, ...data } = req.body;

  if (type === 'grade') {
    gradeTable.create(data)
      .then((grade) => {
        res.status(201).json(grade);
      })
      .catch((error) => {
        res.status(400).json({ message: "Erreur lors de la création", error });
      });
  } else if (type === 'rating') {
    ratingTable.create(data)
      .then((rating) => {
        res.status(201).json(rating);
      })
      .catch((error) => {
        res.status(400).json({ message: "Erreur lors de la création", error });
      });
  } else {
    res.status(400).json({ message: "Type invalide" });
  }
};

const updateOneById = (req, res) => {
  // Vous pouvez ajuster cette fonction pour mettre à jour une note ou une appréciation spécifique
};

const deleteOneById = (req, res) => {
  // Vous pouvez ajuster cette fonction pour supprimer une note ou une appréciation spécifique
};

const ratingController = {
  getAllRatings,
  getOneById,
  createOne,
  updateOneById,
  deleteOneById,
};

module.exports = ratingController;
