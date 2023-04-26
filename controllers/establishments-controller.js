const { QueryTypes } = require('sequelize');
//On importe db qui contient tous nos modèles.
const db = require("../models/index");
const { ValidationError } = require("sequelize");
//On initialise une nouvelle constante qui représente le modèle qui nous intéresse. Ici, la table classes
const establishmentsTable = db["establishments"];
const establishmentTypesTable = db["establishment_types"];
const buildingsTable = db["buildings"];
const roomsTable = db["rooms"];
const roomTypes = db["room_types"];
// const usersTable = db['users'];

//On déclare toutes les méthodes
const getAll = (req, res) => {
  establishmentsTable
    .findAll({
      order: [
        ['id', 'ASC'],
      ],
    })
    .then((result) => {
      if (result.length === 0) {
        res.json({
          Message: "Aucun établissement présent en base de données.",
        });
      } else {
        res.json(result, 200);
      }
    })
    .catch((error) => {
      const message =
        "La liste des établissements n'a pas pu être récupérée. Réessayez dans quelques instants.";
      res.status(500).json({
        message,
        data: error,
      });
    });
};


const getAllWithBuildingsAndRooms = (req, res) => {
  establishmentsTable
    .findAll({
      include: [
        {
          model: establishmentTypesTable,
          as: "establishmentType",
        },
        {
          model: buildingsTable,
          as: "buildings",
          include: [
            {
              model: roomsTable,
              as: "rooms",
              include: [
                {
                  model: roomTypes,
                  as: "roomType",
                },
              ],
            },
          ],
        },
      ],
      order: [
        ['id', 'ASC'],
      ],
    })
    .then((result) => {
      if (result.length === 0) {
        //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
        res.json({
          Message: "Aucun établissement présent en base de données.",
        });
      } else {
        // Sinon, on renvoie le résultat de notre requête
        res.json(result, 200);
      }
    })
    //en cas d'erreur, on passe dans le catch
    .catch((error) => {
      //On définit un status d'erreur et un message a renvoyer
      const message =
        "La liste des établissements n'a pas pu être récupérée. Réessayez dans quelques instants.";
      res.status(500).json({
        message,
        data: error,
      });
    });
};

const getOneWithBuildingsAndRoomsById = (req, res) => {
  establishmentsTable
    .findByPk(req.params.id, {
      include: [
        {
          model: buildingsTable,
          as: "buildings",
          include: [
            {
              model: roomsTable,
              as: "rooms",
            },
          ],
        },
      ],
    })
    .then((classe) => {
      if (!classe) {
        return res
          .status(404)
          .json({ message: "Aucun établissements n'a été trouvé" });
      }
      res.status(200).json(classe);
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération de l'établissements.";
      res.status(500).json({
        message,
        data: error,
      });
    });
};




const getOneById = (req, res) => {
  establishmentsTable
    .findByPk(req.params.id)
    .then((classe) => {
      if (!classe) {
        return res
          .status(404)
          .json({ message: "Aucun établissements n'a été trouvé" });
      }
      res.status(200).json(classe);
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération de l'établissements.";
      res.status(500).json({
        message,
        data: error,
      });
    });
};

const createOne = (req, res) => {
  establishmentsTable
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

const updateOneById = async (req, res) => {
  const { establishment, buildings } = req.body;

  try {
    // Mise à jour de l'établissement
    await establishmentsTable.update(
      {
        name: establishment.name,
        id_establishment_type: establishment.establishment_type_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    // Mise à jour des bâtiments et des salles
    for (const building of buildings) {
      let currentBuilding;
      if (building.id) {
        await buildingsTable.update(
          {
            name: building.name,
          },
          {
            where: {
              id: building.id,
            },
          }
        );
        currentBuilding = await buildingsTable.findByPk(building.id);
      } else {
        currentBuilding = await buildingsTable.create({
          name: building.name,
          id_establishment: req.params.id,
        });
      }

      // Mise à jour des salles
      for (const room of building.classrooms) {
        if (room.id) {
          await roomsTable.update(
            {
              name: room.name,
              id_room_type: room.room_type_id,
            },
            {
              where: {
                id: room.id,
              },
            }
          );
        } else {
          await roomsTable.create({
            name: room.name,
            id_room_type: room.room_type_id,
            id_building: currentBuilding.id,
          });
        }
      }
    }

    res.status(200).json({ message: "Établissement mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'établissement",
      error,
      details: error.errors || [{ message: error.message }],
    });
  }
};





const deleteOneById = (req, res) => {
  establishmentsTable.findByPk(req.params.id).then((classe) => {
    if (!classe) {
      return res.status(404).json({ message: "Aucun classe n'a été trouvée" });
    }

    establishmentsTable
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
  establishmentsTable
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

const createEstablishment = async (req, res) => {
  const { establishment, buildings } = req.body;

  try {
    const newEstablishment = await establishmentsTable.create({
      name: establishment.name,
      id_establishment_type: establishment.establishment_type_id,
    });

    const newBuildings = await Promise.all(
      buildings.map(async (building) => {
        const newBuilding = await buildingsTable.create({
          name: building.name,
          id_establishment: newEstablishment.id,
        });

        const newClassrooms = await Promise.all(
          building.classrooms.map(async (classroom) => {
            return roomsTable.create({
              name: classroom.name,
              id_room_type: classroom.room_type_id,
              id_building: newBuilding.id,
            });
          })
        );

        // Ajout des salles de classe au nouvel objet bâtiment
        return { ...newBuilding.toJSON(), classrooms: newClassrooms };
      })
    );

    res.status(201).json({ newEstablishment, newBuildings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création des données", error, details: error.errors });
  }
};

  
  

//On ajoute toutes les méthodes dans un objet pour faciliter l'export
const classeController = {
  createOne,
  updateOneById,
  deleteOneById,
  getAll,
  getOneById,
  deleteAll,
  createEstablishment,
  getAllWithBuildingsAndRooms,
  getOneWithBuildingsAndRoomsById
};

module.exports = classeController;
