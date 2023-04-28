const db = require("../models/index");
const { ValidationError } = require("sequelize");
const alertsTable = db["alerts"];
const alertTypesTable = db["alert_types"];
const alertsGroupsTable = db["alerts_groups"];

const getAll = (req, res) => {
  //On utilise l'ORM pour SELECT toute la table
  alertsTable
    .findAll({
      include: [
        {
          model: alertTypesTable,
          as: "alert_types",
        },
      ],
    })

    //On utilise les promesses pour gérer les résultats de la requête.
    .then((result) => {
      if (result.length === 0) {
        //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
        res.json({ Message: "Aucune alerte présente en base de données." });
      } else {
        // Sinon, on renvoie le résultat de notre requête
        res.json(result, 200);
      } 
    })
    //en cas d'erreur, on passe dans le catch
    .catch((error) => {
      //On définit un status d'erreur et un message a renvoyer
      const message =
        "La liste des alertes n'a pas pu être récupérée. Réessayez dans quelques instants.";
      res.status(500).json({
        message,
        data: error,
      });
    });
};

const getOneById = (req, res) => {
  alertsTable
    .findByPk(req.params.id)
    .then((alerts) => {
      if (!alerts) {
        return res
          .status(404)
          .json({ message: "Aucune alerte n'a été trouvée" });
      }
      res.status(200).json(alerts);
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération de l'alerte.";
      res.status(500).json({
        message,
        data: error,
      });
    });
};

const createOne = async (io, req, res) => {
  console.log("Request body:", req.body);

  try {
    const alert = await alertsTable.create(req.body);

    // Récupérer les groupes à partir du corps de la requête
    const groups = req.body.groups;
    io.emit("newAlert", alert);

    // Créer des entrées pour chaque groupe dans la table alerts_groups
    // Créer des entrées pour chaque groupe dans la table alerts_groups
    const alertsGroupsPromises = groups.map((groupId) => {
      return alertsGroupsTable.create({
        id_alert: alert.id,
        id_group: groupId,
      });
    });
    
    await Promise.all(alertsGroupsPromises);

    const message = "Une alerte est ajoutée à la base de données.";
    res.status(201).json({
      message,
      data: alert,
      success: true,
    });
  } catch (error) {
    console.log("Error:", error);
    const message =
      "Une erreur a eu lieu lors de l'insertion de l'alerte en base de donnée.";
    if (error instanceof ValidationError) {
      res.status(400).send(error.errors[0].message);
    } else {
      res.status(500).json({
        message,
        error,
      });
    }
  }
};

const updateOneById = (req, res) => {
  alertsTable
    .update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
    .then((result) => {
      const message = "Votre alerte a été mise à jour.";
      res.status(201).json({
        message,
      });
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la modification de l'alerte.";
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

const deleteOneById = (req, res) => {
  alertsTable.findByPk(req.params.id).then((alerts) => {
    if (!alerts) {
      return res.status(404).json({ message: "Aucune alerte n'a été trouvée" });
    }

    alertsTable
      .destroy({
        where: {
          id: req.params.id,
        },
      })

      .then((r) => {
        const message = "l'alerte a bien été supprimée.";
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

// const deleteAll = (req, res) => {
//     alertsTable.destroy({
//             truncate: true
//         })
//         .then(r => {
//             const message = "La table a bien été vidé."
//             res.status(200).send(message)
//         })
//         .catch(error => {
//             const message = "Une erreur a eu lieu lors de la suppression."
//             res.status(500).json({
//                 message,
//                 error
//             })
//         })
// }

const alertsController = (io) => {
    return {
      getAll,
      getOneById,
      createOne: createOne.bind(null, io),
      updateOneById,
      deleteOneById,
    };
  };


module.exports = alertsController;

