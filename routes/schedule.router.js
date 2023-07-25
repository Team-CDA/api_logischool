const {
    Router
} = require("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const scheduleController = require("../controllers/schedule-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       schedule:
 *          type: object
 *          required: 
 *              - id_users
 *              - date
 *              - id_room
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le schedule
 *             id_users:
 *               type: integer
 *               description: L'id de l'utilisateur
 *             date:
 *               type: string
 *               description: La date du schedule
 *             id_room:
 *               type: integer
 *               description: L'id de la room liée au schedule
 *          example: 
 *             id: 1
 *             id_users: 1
 *             date: "2023-06-26"
 *             id_room: 1
 * 
 * 
 */

/** 
 * @swagger
 * 
 * /schedule/:
 *    get:
 *      tags: [Schedule]
 *      summary: Récupère la liste de tous les schedules
 *      description: Récupère la liste de tous les schedules
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Schedule'
 *         404:
 *            description: The schedule table was not found
 */
router.get('/', scheduleController.getAll)

/** 
 * @swagger
 * 
 * /schedule/{id}:
 *    get:
 *      tags: [Schedule]
 *      summary: Récupère les schedules d'un utilisateur en fonction de son id
 *      description: Récupère les schedules d'un utilisateur en fonction de son id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: L'id de l'utilisateur dont vous souhaitez récupérer le schedule.
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Schedule'
 *         404:
 *            description: The schedule table was not found
 */
router.get('/:id', scheduleController.getScheduleByUser)



module.exports = router