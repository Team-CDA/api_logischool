//On importe db qui contient tous nos modèles.
const db = require("../models/index");
const { ValidationError } = require("sequelize");
//On initialise une nouvelle constante qui représente le modèle qui nous intéresse. Ici, la table liaison_books
const liaison_booksTable = db["liaison_books"];

//On déclare toutes les méthodes
const getAll = (req, res) => {
  //On utilise l'ORM pour SELECT toute la table
  liaison_booksTable
    .findAll()

    //On utilise les promesses pour gérer les résultats de la requête.
    .then((result) => {
      if (result.length === 0) {
        //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
        res.json({ Message: "Aucun liaison_book présent en base de données." });
      } else {
        // Sinon, on renvoie le résultat de notre requête
        res.json(result, 200);
      }
    })
    //en cas d'erreur, on passe dans le catch
    .catch((error) => {
      //On définit un status d'erreur et un message a renvoyer
      const message =
        "La liste des liaison_books n'a pas pu être récupérée. Réessayez dans quelques instants.";
      res.status(500).json({
        message,
        data: error,
      });
    });
};

const getOneById = (req, res) => {
  liaison_booksTable
    .findAll({
      where: { id_student: req.params.id },
      include: [
        {
          model: db.users,
          as: "initiator",
          attributes: ["firstName", "lastName", "gender"],
        },
        {
          model: db.users,
          as: "parent",
          attributes: ["firstName", "lastName", "gender"],
        },
        {
          model: db.users,
          as: "student",
          attributes: ["firstName", "lastName", "gender"],
        },
      ],
      order: [["date_message", "DESC"]],
    })

    .then((liaison_book) => {
      if (!liaison_book) {
        return res
          .status(404)
          .json({ message: "Aucun liaison_book n'a été trouvé" });
      }
      liaison_book.forEach((element) => {
        const date = new Date(element.dataValues.date_message);
        element.dataValues.formattedDateMessage = `le ${date.toLocaleDateString(
          "fr-FR",
          {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }
        )} à ${date.toLocaleTimeString("fr-FR", {
          hour: "numeric",
          minute: "numeric",
        })}`;

        if (element.dataValues.date_response) {
          const dateResponse = new Date(element.dataValues.date_response);
          element.dataValues.formattedDateResponse = `le ${dateResponse.toLocaleDateString(
            "fr-FR",
            {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            }
          )} à ${dateResponse.toLocaleTimeString("fr-FR", {
            hour: "numeric",
            minute: "numeric",
          })}`;
        }
      });
      res.status(200).json(liaison_book);
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération de liaison_book.";
      res.status(500).json({
        message,
        data: error,
      });
    });
};

const createOne = (req, res) => {
  liaison_booksTable
    .create(req.body)
    .then((liaison_book) => {
      const message = "message ajouté à la base de données.";
      res.status(201).json({
        success: true,
        message,
        data: liaison_book,
      });
    })
    .catch((error) => {
      console.log("erreur : ", error);
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
  liaison_booksTable
    .findOne({ where: { id: req.params.id } })
    .then((liaison_book) => {
      if (!liaison_book) {
        return res
          .status(404)
          .json({ message: "Aucun liaison_book n'a été trouvé" });
      }

      console.log(req.body);
      liaison_booksTable
        .update(req.body, {
          where: {
            id: req.params.id,
          },
          returning: true,
        })
        .then((result) => {
          const message = " liaison_book correctement mise à jour.";
          res.status(201).json({
            message,
            success: true,
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
  liaison_booksTable.findByPk(req.params.id).then((liaison_book) => {
    if (!liaison_book) {
      return res
        .status(404)
        .json({ message: "Aucun liaison_book n'a été trouvé" });
    }

    liaison_booksTable
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
  liaison_booksTable
    .destroy({
      truncate: true,
    })
    .then((r) => {
      const message = "La table a bien été vidée.";
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
const liaison_bookController = {
  createOne,
  updateOneById,
  deleteOneById,
  getAll,
  getOneById,
  deleteAll,
};

module.exports = liaison_bookController;
