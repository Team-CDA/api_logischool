//On importe db qui contient tous nos modèles.
const db = require("../models/index");
const { ValidationError } = require("sequelize");
//On initialise une nouvelle constante qui représente le modèle qui nous intéresse. Ici, la table classes
const classesTable = db["classes"];
const professorsClasses = db["professors_classes"];
const users = db["users"];
const classTypes = db["class_types"];
// const usersTable = db['users'];

//On déclare toutes les méthodes
const getAll = (req, res) => {
  //On utilise l'ORM pour SELECT toute la table
  classesTable
    .findAll({
      include: [
        {
          model: users,
          as: "users",
        },
        {
          model: classTypes,
          as: "class_type",
        },
      ],
    })

    //On utilise les promesses pour gérer les résultats de la requête.
    .then((result) => {
      if (result.length === 0) {
        //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
        res.json({ Message: "Aucune classe présente en base de données." });
      } else {
        // Sinon, on renvoie le résultat de notre requête
        res.json(result, 200);
      }
    })
    //en cas d'erreur, on passe dans le catch
    .catch((error) => {
      //On définit un status d'erreur et un message a renvoyer
      const message =
        "La liste des classes n'a pas pu être récupérée. Réessayez dans quelques instants.";
      res.status(500).json({
        message,
        data: error,
      });
    });
};

const getAllForOneTeacher = (req, res) => {
  const teacherId = req.params.id;
  classesTable
    .findAll({
      include: [
        {
          model: users,
          as: "users",
        },
        {
          model: classTypes,
          as: "class_type",
        },
        {
          model: users,
          as: "Professors",
          where: {
            id: teacherId,
          },
          through: {
            model: professorsClasses,
          },
        },
      ],
    })
    .then((result) => {
      if (result.length === 0) {
        res.json({ Message: "Aucune classe présente en base de données." });
      } else {
        res.json(result, 200);
      }
    })
    .catch((error) => {
      const message =
        "La liste des classes n'a pas pu être récupérée. Réessayez dans quelques instants.";
      res.status(500).json({
        message,
        data: error,
      });
    });
};

const getOneById = (req, res) => {
  classesTable
    .findByPk(req.params.id, {
      include: [
        {
          model: users,
          as: "users",
          include: [
            {
              model: users,
              as: "tutor",
            },
            {
              model: users,
              as: "tutor2",
            },
          ],
        },
      ],
    })
    .then((classe) => {
      if (!classe) {
        return res
          .status(404)
          .json({ message: "Aucune classe n'a été trouvé" });
      }
      res.status(200).json(classe);
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération de la classe.";
      res.status(500).json({
        message,
        data: error,
      });
    });
};

const createOne = (req, res) => {
  classesTable
    .create(req.body)

    .then((classe) => {
      const message = "Classe ajouté à la base de données.";
      res.status(201).json({
        message,
        data: classe,
      });
    })

    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de l'insertion en base de donnée.";
      if (error instanceof ValidationError) {
        res.status(400).send(error.errors[0].message);
      } else {
        res.status(500).json({
          message,
          error,
        });
      }
    });
};

const updateOneById = (req, res) => {
  classesTable.findByPk(req.params.id).then((classe) => {
    if (!classe) {
      return res.status(404).json({ message: "Aucune classe n'a été trouvé" });
    }

    classesTable
      .update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      })
      .then((result) => {
        const message = "Classe correctement mise à jour.";
        res.status(201).json({
          message,
        });
      })
      .catch((error) => {
        const message = "Une erreur a eu lieu lors de la modification.";
        if (error instanceof ValidationError) {
          res.status(400).send(error.errors[0].message);
        } else {
          res.status(500).json({
            message,
            error,
          });
        }
      });
  });
};

const deleteOneById = (req, res) => {
  classesTable.findByPk(req.params.id).then((classe) => {
    if (!classe) {
      return res.status(404).json({ message: "Aucun classe n'a été trouvée" });
    }

    classesTable
      .destroy({
        where: {
          id: req.params.id,
        },
      })

      .then((r) => {
        const message = "L'élément a bien été supprimé.";
        res.status(200).send(message);
      })

      .catch((error) => {
        const message = "Une erreur a eu lieu lors de la suppression.";
        res.status(500).json({
          message,
          error,
        });
      });
  });
};

const deleteAll = (req, res) => {
  classesTable
    .destroy({
      truncate: true,
    })
    .then((r) => {
      const message = "La table a bien été vidé.";
      res.status(200).send(message);
    })
    .catch((error) => {
      const message = "Une erreur a eu lieu lors de la suppression.";
      res.status(500).json({
        message,
        error,
      });
    });
};

//On ajoute toutes les méthodes dans un objet pour faciliter l'export
const classeController = {
  createOne,
  updateOneById,
  deleteOneById,
  getAll,
  getOneById,
  deleteAll,
  getAllForOneTeacher,
};

module.exports = classeController;
