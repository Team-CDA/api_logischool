//On importe db qui contient tous nos modèles.
const db = require('../models/index');
const { ValidationError } = require('sequelize');
//On initialise une nouvelle constante qui représente le modèle qui nous intéresse. Ici, la table menus
const menusTable = db['menus'];


//On déclare toutes les méthodes
const getAll = (req, res) => {

    //On utilise l'ORM pour SELECT toute la table
    menusTable.findAll()

        //On utilise les promesses pour gérer les résultats de la requête.
        .then(result => {
            if (result.length === 0) {

                //Si la table est vide, la requête est quand même réussi mais on renvoie un message pour prévenir que la table est vide.
                res.json({Message : "Aucun menu présent en base de données."})
            } else {
                // Sinon, on renvoie le résultat de notre requête
                res.json(result, 200)
            }
        })
        //en cas d'erreur, on passe dans le catch
        .catch(error => {
            //On définit un status d'erreur et un message a renvoyer
            const message = "La liste des menus n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({
                message,
                data: error
            })
        })

}

const getOneById = (req, res) => {
    menusTable.findByPk(req.params.id)
        .then(menu => {
            if (!menu) {
                return res.status(404).json({ message: "Aucun menu n'a été trouvé" })
            }
            res.status(200).json(menu)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la récupération de menu."
            res.status(500).json({
                message,
                data: error
            })
        })
}

const createOne = (req, res) => {
    menusTable.create(req.body)
        .then(menu => {
            const message = "Type de menu ajouté à la base de données."
            res.status(201).json({
                success: true,
                message,
                data: menu
            })
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de l'insertion en base de donnée."
            if (error instanceof ValidationError) {
                res.status(400).send(error.errors[0].message)
            } else {
                res.status(500).json({
                    message,
                    error
                })
            }
        })
}



const updateOneById = (req, res) => {
    menusTable
        .findByPk(req.params.id)
        .then((menu) => {
        if (!menu) {
            return res.status(404).json({ message: "Aucun menu n'a été trouvé" });
        }

        const { menu_date, starter, main_course, dessert } = req.body;

        const updatedMenuData = {
            // menu_date,
            starter,
            main_course,
            dessert,
        };
    
        menusTable
            .update(updatedMenuData, {
            where: {
                id: req.params.id,
            },
            returning: true,
            })
            .then((result) => {
            const message = "Type de menu correctement mise à jour.";
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
    menusTable.findByPk(req.params.id)
    .then(menu => {
        if(!menu) {
            return res.status(404).json({message: "Aucun menu n'a été trouvé"})
        }

    menusTable.destroy({
            where: {
                id: req.params.id
            }
        })

        .then(r => {
            const message = "L'élément a bien été supprimé."
            res.status(200).send(message)
        })

        .catch(error => {
            const message = "Une erreur a eu lieu lors de la suppression."
            res.status(500).json({
                message,
                error
            })
        })
    })
}

const deleteAll = (req, res) => {
    menusTable.destroy({
            truncate: true
        })
        .then(r => {
            const message = "La table a bien été vidée."
            res.status(200).send(message)
        })
        .catch(error => {
            const message = "Une erreur a eu lieu lors de la suppression."
            res.status(500).json({
                message,
                error
            })
        })
}

//On ajoute toutes les méthodes dans un objet pour faciliter l'export
const menuController = {
    createOne,
    updateOneById,
    deleteOneById,
    getAll,
    getOneById,
    deleteAll
}


module.exports = menuController