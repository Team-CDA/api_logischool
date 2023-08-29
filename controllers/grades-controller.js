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
};

const updateOneById = (req, res) => {
};

const deleteOneById = (req, res) => {
};

const bulkUpdate = async (req, res) => {
  // on récupère les notes envoyées par le front
  const grades = req.body;
  // on crée une transaction pour pouvoir annuler toutes les modifications en cas d'erreur
  const transaction = await db.sequelize.transaction();
  // on récupère les matières pour pouvoir vérifier que les notes sont bien associées à une matière existante
  try {
    // pour chaque note, on vérifie que la matière existe
    for (let grade of grades) {
      const { id, id_student, id_subject, grade_value, action } = grade;
      if (action === 'create') {
        await gradeTable.create({ id_student, id_subject, grade: grade_value }, { transaction });
      } else if (action === 'update') {
        await gradeTable.update({ grade: grade_value }, { where: { id }, transaction });
      } else if (action === 'delete') {
        await gradeTable.destroy({ where: { id }, transaction });
      }
    }

    await transaction.commit();
    res.status(200).json({ message: 'Les notes ont été mises à jour avec succès.' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des notes", error });
  }
};

const gradeController = {
  getAllGrades,
  getOneById,
  createOne,
  updateOneById,
  deleteOneById,
  bulkUpdate
};

module.exports = gradeController;
