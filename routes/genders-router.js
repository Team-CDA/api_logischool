
const { Router } = require ("express")
const gendersController = require("../controllers/genders-controller")
const router = Router()

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Genders:
 *          type: object
 *          required: 
 *              - role
 *          properties: 
 *             gender:
 *               type: string
 *               description: L'id qui représente le genre
 *          example: 
 *             id: 1
 *             gender: "Homme"
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 */


/** 
 * @swagger
 * 
 * /genders:     
 *    get:
 *      tags: [Genre]
 *      summary: Récupère les genres utilisateurs
 *      responses: 
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Genders'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/', gendersController.getGenderAll)

module.exports = router