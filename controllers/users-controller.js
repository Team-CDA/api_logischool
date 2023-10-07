//On importe db qui contient tous nos modèles.
const db = require("../models/index");
const { ValidationError, Op } = require("sequelize");
const bcrypt = require("bcrypt");
const usersTable = db["users"];
const classesTable = db["classes"];
const groupTable = db["groups"];
const rolesTable = db["roles"];
const usersGroups = db["users_groups"];
const establishmentsTable = db["establishments"];
const jwt = require("jsonwebtoken");
const sendMail = require("../helpers/sendMail");


const getAllUsers = (req, res) => {
  //On utilise l'ORM pour SELECT toute la table
  usersTable
    .findAll({
      include: [
        {
          model: classesTable,
          as: "classes",
          through: "users_classes",
          // attributes: ['id', 'name'],
        },
        {
          model: rolesTable,
          as: "roles",
          // attributes: ['id', 'role'],
        },
        {
          model: establishmentsTable,
          as: "establishments",
          // attributes: ['id', 'name'],
        },
        {
          model: usersTable,
          as: "tutor",
        },
        {
          model: usersTable,
          as: "tutor2",
        },
      ],
    })
    //On utilise les promesses pour gérer les résultats de la requête.
    .then((result) => {
      if (result.length === 0) {
        //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
        res.json({ Message: "Aucun utilisateur présent en base de données." });
      } else {
        // Sinon, on renvoie le résultat de notre requête
        res.json(result, 200);
      }
    })
    //en cas d'erreur, on passe dans le catch
    .catch((error) => {
      //On définit un status d'erreur et un message a renvoyer
      const message =
        "La liste des utilisateurs n'a pas pu être récupérée. Réessayez dans quelques instants.";
      res.status(500).json({
        message,
        data: error.message,
      });
    });
};

const getParents = (req, res) => {
  // On récupère tous les utilisateurs qui ont le rôle 2 (parent)
  usersTable
    .findAll({
      where: {
        id_role: 2,
      },
      include: [
        {
          model: rolesTable,
          as: "roles",
        },
      ],
    })
    // Puis on renvoie le résultat
    .then((users) => {
      if (!users) {
        return res
          .status(404)
          .json({ message: "Aucun utilisateur n'a été trouvé" });
      }
      res.status(200).json(users);
    })
    // En cas d'erreur, on passe dans le catch
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération d'un utilisateur.";
      res.status(500).json({
        message,
        data: error.message,
      });
    });
};

const getOneById = (req, res) => {
  usersTable
    .findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "Aucun utilisateur n'a été trouvé" });
      }
      // Obtenir les groupes de l'utilisateur
      user.getGroups().then((groups) => {
        console.log('groupes de user : ', groups);
        // Ajouter les groupes à l'objet utilisateur
        user.dataValues.groups = groups;

        // Obtenir les matières de l'utilisateur
        user.getSubjects().then((subjects) => {
          // Ajouter les matières à l'objet utilisateur
          user.dataValues.subjects = subjects;
          res.status(200).json(user);
        });
      });
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération d'un utilisateur.";
      res.status(500).json({
        message,
        data: error.message,
      });
    });
};

const getByParent = (req, res) => {
  usersTable
    .findAll({
      where: {
        [Op.or]: [
          { first_tutor: req.params.id },
          { second_tutor: req.params.id },
        ],
      },
    })
    .then((users) => {
      if (!users) {
        return res
          .status(404)
          .json({ message: "Aucun utilisateur n'a été trouvé" });
      }
      res.status(200).json(users);
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération d'un utilisateur.";
      res.status(500).json({
        message,
        data: error.message,
      });
    });
};

const getByGroup = (req, res) => {
  const idGroup = req.params.id;
  usersTable
    .findAll({
      include: [
        {
          model: groupTable,
          where: { id: idGroup },
          through: {
            model: usersGroups,
            attributes: [],
          },
        },
      ],
    })
    .then((users) => {
      if (!users) {
        return res
          .status(404)
          .json({ message: "Aucun utilisateur n'a été trouvé" });
      }
      res.status(200).json(users);
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération d'un utilisateur.";
      res.status(500).json({
        message,
        data: error.message,
      });
    });
};

const getByGroupFromBackEnd = (idGroup) => {
  console.log("on passe là", idGroup);
  usersTable
    .findAll({
      include: [
        {
          model: groupTable,
          where: { id: idGroup },
          through: {
            model: usersGroups,
            attributes: [],
          },
        },
      ],
    })
    .then((users) => {
      if (!users) {
        return [];
      }
      return users;
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération d'un utilisateur.";
      return message;
    });
};

const createOne = (req, res) => {
  usersTable
    .create(req.body)
    .then((user) => {
      const message = "Un utilisateur est ajouté à la base de données.";
      // Créer un JWT pour cet utilisateur spécifique
      const token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expirera après 1 heure
      );

      const resetLink = `http://localhost:3001/resetPassword?id=${user.id}&token=${token}`;
      user.token = token;
      user.save();

      try {
        sendMail(
          user.email,
          'Vous êtes inscrit sur LOGISCHOOL !',
          `Cher(e) ${user.firstname} ${user.lastname},

            Bienvenue sur notre plateforme ! Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe et vous connecter pour la première fois : ${resetLink}.

            Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.
            
            Bienvenue parmi nous !
            
            Cordialement,
            L'équipe LOGISCHOOL`
        );

        res.status(201).json({
          message,
          data: user,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("There was an error while creating the user");
      }
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

const resetPassword = async (req, res) => {
  // Récupérer l'utilisateur avec l'id et le token
  const { id, token } = req.params;
  // On récupère le nouveau mot de passe hashé
  const password = await bcrypt.hash(req.body.password, 10);
  // On vérifie que l'utilisateur existe
  usersTable
    .findByPk(id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "Aucun utilisateur n'a été trouvé" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Si le token n'est pas valide, on renvoie une erreur
      if (decoded.userId !== user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // Si le token est valide, on met à jour le mot de passe
      user.password = password;
      user.save();
      // et on renvoie un message de succès
      res.status(200).json({ message: "Password updated successfully" });
    })
    // En cas d'erreur, on passe dans le catch
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération d'un utilisateur.";
      res.status(500).json({
        message,
        data: error.message,
      });
    });
};

const createParent = (req, res) => {
  usersTable
    .create(req.body)

    .then((users) => {
      const message = "Un tuteur est ajouté à la base de données.";
      res.status(201).json({
        message,
        data: users,
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
  usersTable
    .update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
    .then((result) => {
      const message = "Vos données utilisateur sont correctement mis à jour.";
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
};

const deleteOneById = (req, res) => {
  usersTable.findByPk(req.params.id).then((users) => {
    if (!users) {
      return res
        .status(404)
        .json({ message: "Aucun utilisateur n'a été trouvé" });
    }

    usersTable
      .destroy({
        where: {
          id: req.params.id,
        },
      })

      .then((r) => {
        const message = "L'utilisateur a bien été supprimé.";
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

const getUserByMail = async (email) => {
  try {
    const user = await usersTable.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return {
        id: user.id,
        email: user.email,
        role: user.id_role,
        firstname: user.firstname,
        lastname: user.lastname,
      };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteAll = (req, res) => {
  rolesTable
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

const getallUsersClasse = (req, res) => {};

const checkUserCredentials = async (email, password) => {
  try {
    const user = await usersTable.findOne({
      where: {
        email: email,
      },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const userController = {
  getAllUsers,
  getOneById,
  getByGroup,
  getByGroupFromBackEnd,
  createOne,
  updateOneById,
  deleteOneById,
  deleteAll,
  checkUserCredentials,
  getUserByMail,
  getByParent,
  getParents,
  createParent,
  resetPassword,
};

module.exports = userController;
