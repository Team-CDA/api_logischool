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
 *               description: The ID that represents the group of alerts
 *             id_alert:
 *               type: integer
 *               description: The ID that represents the alert
 *             id_group:
 *               type: integer
 *               description: The ID that represents the group
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
 *      summary: Retrive the list of alerts
 *      description: Retrive the list of alerts
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
 *      summary: Retrieve a group of alerts by its ID
 *      description: Retrieve a group of alerts by its ID
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
 *      summary: Allow adding a group of alerts
 *      description: Allow adding a group of alerts.
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
 *      summary: Allow modifying a group of alerts
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Alerts_groups'
 *    description: You can modify a group of alerts by its ID.
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
 *      summary: Allow deleting a group of alerts
 *      description: Pass the ID of the group of alerts you wish to delete in the URL and it's done.
 *      responses:
 *         200:
 *          description: alerts successfully deleted
 *         
 */
router.delete('/delete/:id', alertsController.deleteOneById)

module.exports = router