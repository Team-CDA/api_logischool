const { Router } = require ("express")
const alertsController = require("../controllers/alerts_groups-controller")
const router = Router()

/**
 * @swagger
 *  components: 
 *    schemas:
 *       Alerts_groups:
 *          type: object
 *          required: 
 *              - alerts_groups
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le type d'alerte
 *             id_alert:
 *               type: integer
 *               description: L'id qui représente l'alerte
 *             id_group:
 *               type: integer
 *               description: L'id qui représente le groupe
 *          example: 
 *             id: 1
 *             id_alert: 1
 *             id_group: 1 
 * 
 */

/** 
 * @swagger
 * 
 * /alerts_groups:
 *    get:
 *      tags: [Alerts_groups]
 *      summary: Récupère la liste des alertes
 *      description: Récupère la liste des alertes
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *                   application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                              $ref: '#/components/schemas/Alerts_groups'
 *         404:
 *            description: the alerts table was not found
 * 
 */
router.get('/', alertsController.getAll)

/** 
 * @swagger
 * 
 * /alerts_groups:
 *    get:
 *      tags: [Alerts_groups]
 *      summary: Récupère une alerte par son id
 *      description: Récupère une alerte par son id
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/:id', alertsController.getOneById)

/** 
 * @swagger
 * 
 * /alerts_groups/create:
 *    post:
 *      tags: [Alerts_groups]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Alerts_groups'
 *      summary: Permet d'ajouter une alerte
 *      description: Permet d'ajouter une alerte.
 *      responses: 
 *         200:
 *            description: alert successfully fetched
 */
router.post('/create', alertsController.createOne)


/** 
 * @swagger
 * 
 * /alerts_groups/update/{id}:
 *    patch:
 *      tags: [Alerts_groups]
 *      summary: Permet La modification d'une alerte
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Alerts_groups'
 *    description: Grâce à l'id d'une alerte vous pouvez la modifier.
 *    responses:
 *         200:
 *          description: alert successfully updated
 *         
 */
router.patch('/update/:id', alertsController.updateOneById)

/** 
 * @swagger
 * 
 * /alerts_groups/delete/{id}:
 *    delete:
 *      tags: [Alerts_groups]
 *      summary: Permet La suppressin d'une alerte
 *      description: Passer l'id due alerte que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: alerts successfully deleted
 *         
 */
router.delete('/delete/:id', alertsController.deleteOneById)

module.exports = router