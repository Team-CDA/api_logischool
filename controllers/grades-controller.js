const db = require("../models/index");
const { ValidationError, Op } = require("sequelize");
const gradeTable = db["grades"];
const subjectTable = db["subjects"];

const getAllGrades = (req, res) => {
  Promise.all([
    gradeTable.findAll()
  ])
  .then(([grades]) => {
    res.status(200).json({ grades });
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
  gradeTable.findAll({
    where: { id_student: studentId },
    include: [
      {
        model: db.subjects,
        as: "subject"
      }
    ]
  })
  .then(grades => {
    res.status(200).json({ grades });
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
  } else if (type === 'grade') {
    gradeTable.create(data)
      .then((grade) => {
        res.status(201).json(grade);
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

const gradeController = {
  getAllGrades,
  getOneById,
  createOne,
  updateOneById,
  deleteOneById,
};

module.exports = gradeController;
