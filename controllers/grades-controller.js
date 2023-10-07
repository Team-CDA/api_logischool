const db = require("../models/index");
const { ValidationError, Op } = require("sequelize");
const gradeTable = db["grades"];
const subjectTable = db["subjects"];

const getAllGrades = (req, res) => {
  gradeTable.findAll({
    include: [
      {
        model: db['users_classes'],
        as: 'studentClass',
        include: [
          {
            model: db['classes'],
            as: 'classes',
          }
        ],
      },
      {
        model: db['subjects'],
        as: 'subject',
      }
    ]
  })
  .then((grades) => {
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
  gradeTable
    .findAll({
      where: { id_student: studentId },
      include: [
        {
          model: db.subjects,
          as: "subject",
        },
      ],
    })
    .then((grades) => {
      res.status(200).json({ grades });
    })
    .catch((error) => {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération des appréciations",
        error,
      });
    });
};

const createOne = (req, res) => {};

const updateOneById = (req, res) => {};

const deleteOneById = (req, res) => {};

const bulkUpdate = async (req, res) => {
  console.log("EZ", req.body);
  const grades = req.body; // Les notes envoyées par le front
  const transaction = await db.sequelize.transaction(); // Création d'une transaction

  try {
    for (let grade of grades) {
      // Déstructuration pour inclure 'isNew'
      const {
        grade_id,
        id_student,
        id_teacher,
        id_subject,
        grade_value,
        action,
        isNew,
        date,
      } = grade;

      if (action === "create" || isNew) {
        // Si l'action est 'create' ou si la note est nouvelle (isNew est vrai)
        // On omet 'id' pour que la base de données génère un ID
        await gradeTable.create(
          {
            id_student,
            id_subject,
            id_teacher,
            grade: grade_value,
            createdAt: date,
          },
          { transaction }
        );
      } else if (action === "update") {
        // Ici, id est sûr d'être défini
        await gradeTable.update(
          { grade: grade_value },
          { where: { id: grade_id }, transaction }
        );
      } else if (action === "delete") {
        // Ici, id est sûr d'être défini
        await gradeTable.destroy({ where: { id: grade_id }, transaction });
      }
    }

    await transaction.commit();
    res
      .status(200)
      .json({ message: "Les notes ont été mises à jour avec succès." });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour des notes",
      error,
    });
  }
};

const gradeController = {
  getAllGrades,
  getOneById,
  createOne,
  updateOneById,
  deleteOneById,
  bulkUpdate,
};

module.exports = gradeController;
