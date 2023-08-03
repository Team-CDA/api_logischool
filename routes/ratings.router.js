const { Router } = require("express");
const jwt = require("jsonwebtoken");
const ratingController = require("../controllers/ratings-controller");
const router = Router();
const { checkRatingCredentials, getRatingByMail } = ratingController;

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components:
 *    schemas:
 *       Ratings:
 *          type: object
 *          required:
 *              - role
 *          properties:
 *             id:
 *               type: integer
 *               description: L'id qui représente le rôle
 *             firstname:
 *               type: string
 *               description: Le prénom de l'utilisateur
 *             password:
 *               type: string
 *               description: Le mot de passe de l'utilisateur
 *             gender:
 *               type: string
 *               description: Le genre de l'utilisateur
 *             lastname:
 *               type: string
 *               description: Le nom de l'utilisateur
 *             birthdate:
 *               type: date
 *               description: La date de naissance de l'utilisateur
 *             adress:
 *               type: string
 *               description: L'adresse de l'utilisateur
 *             city:
 *               type: string
 *               description: La ville de l'utilisateur
 *             zipcode:
 *               type: string
 *               description: Le code postal de l'utilisateur
 *             email:
 *               type: string
 *               description: L'adresse email de l'utilisateur
 *             phone:
 *               type: string
 *               description: Le numéro de téléphone de l'utilisateur
 *             ine:
 *               type: string
 *               description: Le numéro INE de l'utilisateur
 *             id_first_tutor:
 *               type: integer
 *               description: L'id du premier tuteur de l'utilisateur
 *             id_second_tutor:
 *               type: integer
 *               description: L'id du second tuteur de l'utilisateur
 *             id_establishment:
 *               type: integer
 *               description: L'id de l'établissement de l'utilisateur
 *             id_role:
 *               type: integer
 *               description: L'id du rôle de l'utilisateur
 *             id_status:
 *               type: integer
 *               description: L'id du statut de l'utilisateur
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification du rôle
 *          example:
 *             id: 1
 *             firstname: "Jean"
 *             lastname: "Dupont"
 *             password: "123456"
 *             gender: "M"
 *             birthdate: 2000-12-14
 *             adress: "1 rue de la paix"
 *             city: "Paris"
 *             zipcode: "75000"
 *             email: "lol@gmail.com"
 *             phone: "0606060606"
 *             ine: "123456789"
 *             id_first_tutor: 1
 *             id_second_tutor: 2
 *             id_establishment: 1
 *             id_role: 1
 *             id_status: 1
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 *
 *
 */

/**
 * @swagger
 *
 * /ratings:
 *    get:
 *      tags: [Ratings]
 *      summary: Récupère la liste de tous les utilisateurs
 *      responses:
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Ratings'
 *         404:
 *            description: the table was not found
 *
 */
router.get("/", ratingController.getAllRatings);

/**
 * @swagger
 *
 * /ratings/{id}:
 *    get:
 *      tags: [Ratings]
 *      summary: Récupère un utilisateurs par son id
 *      description: Récupère un utilisateurs par son id
 *      responses:
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Ratings'
 *         404:
 *            description: the table was not found
 *
 */
router.get("/:id", ratingController.getOneById);

/**
 * @swagger
 *
 * /ratings/{id}:
 *    get:
 *      tags: [Ratings]
 *      summary: Récupère un utilisateurs par l'id de son tuteur
 *      description: Récupère un utilisateurs par l'id de son tuteur
 *      responses:
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Ratings'
 *         404:
 *            description: the table was not found
 *
 */

/**
 * @swagger
 *
 * /ratings/create:
 *    post:
 *      tags: [Ratings]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Ratings'
 *      summary: Permet d'ajouter un nouveau utilisateur
 *      description: En Remplissant le formulaire, vous pouvez créer un nouveau utilisateur.
 *      responses:
 *         200:
 *            description: Role successfully created
 *
 *
 */
router.post("/create", ratingController.createOne);

/**
 * @swagger
 *
 * /ratings/update/{id}:
 *    patch:
 *      tags: [Ratings]
 *      summary: Permet la modification d'un utilisateur
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Ratings'
 *    description: Grâce à l'id d'un utilisateur vous pouvez modifier certaine information.
 *    responses:
 *         200:
 *          description: Role successfully updated
 *
 */
router.patch("/update/:id", ratingController.updateOneById);

/**
 * @swagger
 *
 * /ratings/delete/{id}:
 *    delete:
 *      tags: [Ratings]
 *      summary: Permet la suppression d'un utilisateur
 *      description: Passer l'id du rôle que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: rating successfully deleted
 *
 */
router.delete("/delete/:id", ratingController.deleteOneById);

/**
 * @swagger
 *
 * /ratings/login:
 *    post:
 *      tags: [Ratings]
 *      summary: Authentifie un utilisateur et renvoie un token JWT
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                   - email
 *                   - password
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: L'adresse e-email de l'utilisateur
 *                   password:
 *                     type: string
 *                     description: Le mot de passe de l'utilisateur
 *      responses:
 *         200:
 *            description: Token JWT généré avec succès
 *         401:
 *            description: Adresse e-email ou mot de passe invalide
 */

module.exports = router;
