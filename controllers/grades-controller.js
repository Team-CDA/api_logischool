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
  console.log('EZ', req.body);
  const grades = req.body;  // Les notes envoyées par le front
  const transaction = await db.sequelize.transaction();  // Création d'une transaction

  const errorMessages = [];  // Tableau pour stocker les messages d'erreur

  try {
    for (let grade of grades) {
      // Déstructuration pour inclure 'isNew'
      const { grade_id, id_student, id_teacher, id_subject, grade_value, action, isNew } = grade;

      if (grade_value < 0 || grade_value > 20) {
        errorMessages.push('La note doit être comprise entre 0 et 20.');
      }

      if (errorMessages.length === 0) {
        if (action === 'create' || isNew) {
          await gradeTable.create({ id_student, id_subject, id_teacher, grade: grade_value }, { transaction });
        } else if (action === 'update') {
          await gradeTable.update({ grade: grade_value }, { where: { id: grade_id }, transaction });
        } else if (action === 'delete') {
          await gradeTable.destroy({ where: { id: grade_id }, transaction });
        }
      }
    }

    if (errorMessages.length > 0) {
      throw new Error("Validation failed");
    }

    await transaction.commit();
    res.status(200).json({ message: 'Les notes ont été mises à jour avec succès.' });
  } catch (error) {
    await transaction.rollback();
    if (error instanceof db.Sequelize.ValidationError) {
      errorMessages.push(`Erreur Sequelize: ${error.message}`);
    }
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des notes", error: errorMessages.join(" ") });
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
