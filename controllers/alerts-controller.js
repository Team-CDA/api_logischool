const db = require("../models/index");

const { ValidationError } = require("sequelize");
const alertsTable = db["alerts"];
const alertTypesTable = db["alert_types"];
const groupTable = db["groups"];
const usersGroupsTable = db["users_groups"];
const usersTable = db["users"];
const alertsGroupsTable = db["alerts_groups"];
const alertsUsersTable = db["alerts_users"];
const usercontroller = require("../controllers/users-controller");
const userController = require("../controllers/users-controller");

const sequelize = db.sequelize;
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

const getAllForOneUser = (req, res) => {
  alertsUsersTable
    .findAll({
      where: { id_user: req.params.id, seenAt: null },
      include: [{ model: alertsTable, as: "alerts" }],
    })
    .then((alertsUsers) => {
      if (!alertsUsers) {
        return res
          .status(404)
          .json({ message: "Aucune alerte n'a été trouvée" });
      }
      const alerts = alertsUsers.map((alertUser) => ({
        id: alertUser.alerts.id,
        message: alertUser.alerts.message,
        transmission_date: alertUser.alerts.transmission_date,
        id_alert_type: alertUser.alerts.id_alert_type,
        createdAt: alertUser.alerts.createdAt,
        updatedAt: alertUser.alerts.updatedAt,
        idAlertUser: alertUser.id,
      }));
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
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const alert = await alertsTable.create(req.body, { transaction });

    const groups = req.body.groups;
    const users = req.body.users;
    const userAlreadyAlerted = [];
    // si le groupe n'est pas vide alors on crée des entrées pour chaque groupe dans la table alerts_groups
    if (groups.length > 0) {
      const alertsGroupsPromises = groups.map(async (groupId) => {
        usersTable
          .findAll({
            include: [
              {
                model: groupTable,
                where: { id: groupId },
                through: {
                  model: usersGroupsTable,
                  attributes: [],
                },
              },
            ],
          })
          .then((users) => {
            if (!users) {
              return [];
            }
            const userList = users.map((user) => user.get({ plain: true }));

            if (users.length > 0) {
              userList.map(async (user) => {
                console.log(user);
                // on push les utilisateurs ayant déjà une alerte car présent dans le groupe
                await userAlreadyAlerted.push(user.id);
                return alertsUsersTable.create({
                  id_alert: alert.id,
                  id_user: user.id,
                });
              });
            }
          })
          .catch((error) => {
            const message =
              "Une erreur a eu lieu lors de la récupération d'un utilisateur.";
            return message;
          });
        return alertsGroupsTable.create(
          {
            id_alert: alert.id,
            id_group: groupId,
          },
          { transaction }
        );
      });

      await Promise.all(alertsGroupsPromises);
    }

    // si les utilisateurs ne sont pas vides alors on crée des entrées pour chaque utilisateur dans la table alerts_users

    if (users.length > 0) {
      const alertsUsersTablePromises = users.map((userId) => {
        console.log("aleradyAlerted : ", userAlreadyAlerted);
        // On vérifie qu'ils n'otn pas déjà recu l'alerte dans le bloc groupe plus haut
        if (!userAlreadyAlerted.includes(userId)) {
          return alertsUsersTable.create(
            {
              id_alert: alert.id,
              id_user: userId,
            },
            { transaction }
          );
        }
      });
      await Promise.all(alertsUsersTablePromises);
    }

    await transaction.commit();
    io.emit("newAlert", alert, groups, users);
    const message = "Une alerte est ajoutée à la base de données.";
    res.status(201).json({
      message,
      data: { alert, groups, users },
      success: true,
    });
  } catch (error) {
    console.log("erreur de transaction :", error.message);
    await transaction.rollback();
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
    getAllForOneUser,
  };
};

module.exports = alertsController;
