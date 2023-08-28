const { Router } = require("express")
const router = Router()
const profclassController = require("../controllers/profclass-controller")

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       profclass:
 *          type: object
 *          required: 
 *              - users_id
 *              - role_user
 *              - firstname_users
 *              - lastname_users
 *              - id_user_subject
 *              - id_subject
 *              - subject_name
 *              - id_class
 *              - id_user_classes
 *              - classes_name
 *              - scolarity_year
 *              - id_class_type_classes
 *              - class_type
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'ID qui représente le profclass
 *             users_id:
 *               type: integer
 *               description: L'ID de l'utilisateur
 *             role_user:
 *               type: integer
 *               description: Le rôle de l'utilisateur
 *             firstname_users:
 *               type: string
 *               description: Le prénom de l'utilisateur
 *             lastname_users:
 *               type: string
 *               description: Le nom de famille de l'utilisateur
 *             id_user_subject:
 *               type: integer
 *               description: L'ID de l'utilisateur dans le sujet
 *             id_subject:
 *               type: integer
 *               description: L'ID du sujet
 *             subject_name:
 *               type: string
 *               description: Le nom du sujet
 *             id_class:
 *               type: integer
 *               description: L'ID de la classe
 *             id_user_classes:
 *               type: integer
 *               description: L'ID de l'utilisateur dans la classe
 *             classes_name:
 *               type: string
 *               description: Le nom de la classe
 *             scolarity_year:
 *               type: string
 *               description: L'année scolaire
 *             id_class_type_classes:
 *               type: integer
 *               description: L'ID du type de classe
 *             class_type:
 *               type: string
 *               description: Le type de classe
 *          example: 
 *             id: 1
 *             users_id: 1
 *             role_user: 2
 *             firstname_users: "John"
 *             lastname_users: "Doe"
 *             id_user_subject: 1
 *             id_subject: 1
 *             subject_name: "Mathematics"
 *             id_class: 1
 *             id_user_classes: 1
 *             classes_name: "Class A"
 *             scolarity_year: "2023-2024"
 *             id_class_type_classes: 1
 *             class_type: "Science"
 * 
 * 
 */

/**
 * @swagger
 *
 * /profclass/:
 *    get:
 *      tags: [ProfClass]
 *      summary: Récupère la liste de tous les profclass
 *      description: Récupère la liste de tous les profclass
 *      responses:
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/ProfClass'
 *         404:
 *            description: The profclass table was not found
 */
router.get('/', profclassController.getAll)

/** 
 * @swagger
 * 
 * /profclass/{id}:
 *    get:
 *      tags: [ProfClass]
 *      summary: Récupère les professeurs d'un utilisateur en fonction de son id
 *      description: Récupère les professeurs d'un utilisateur en fonction de son id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Récupère les professeurs d'un utilisateur en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/ProfClass'
 *         404:
 *            description: The schedule table was not found
 */
router.get('/:id', profclassController.getAllByStudentId)



module.exports = router


