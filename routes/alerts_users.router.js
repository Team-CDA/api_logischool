const { Router } = require ("express")
const alertsUsersController = require("../controllers/alerts_users-controller")
const router = Router()

/**
 * @swagger
 *  components: 
 *    schemas:
 *       Alerts_users:
 *          type: object
 *          required: 
 *              - alerts_users
 *          properties: 
 *             id:
 *               type: integer
 *               description: The ID that represents the user of alerts
 *             id_alert:
 *               type: integer
 *               description: The ID that represents the alert
 *             id_user:
 *               type: integer
 *               description: The ID that represents the user
 *          example: 
 *             id: 1
 *             id_alert: 1
 *             id_user: 1 
 * 
 */

/** 
 * @swagger
 * 
 * /alerts_users:
 *    get:
 *      tags: [Alerts_users]
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
 *                              $ref: '#/components/schemas/Alerts_users'
 *         404:
 *            description: the alerts table was not found
 * 
 */
router.get('/', alertsUsersController.getAll)

/** 
 * @swagger
 * 
 * /alerts_users:
 *    get:
 *      tags: [Alerts_users]
 *      summary: Retrieve a user of alerts by its ID
 *      description: Retrieve a user of alerts by its ID
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/:id', alertsUsersController.getOneById)

/** 
 * @swagger
 * 
 * /alerts_users/create:
 *    post:
 *      tags: [Alerts_users]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Alerts_users'
 *      summary: Allow adding a user of alerts
 *      description: Allow adding a user of alerts.
 *      responses: 
 *         200:
 *            description: alert successfully fetched
 */
router.post('/create', alertsUsersController.createOne)


/** 
 * @swagger
 * 
 * /alerts_users/update/{id}:
 *    patch:
 *      tags: [Alerts_users]
 *      summary: Allow modifying a user of alerts
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Alerts_users'
 *    description: You can modify a user of alerts by its ID.
 *    responses:
 *         200:
 *          description: alert successfully updated
 *         
 */
router.patch('/update/:id', alertsUsersController.updateOneById)

/** 
 * @swagger
 * 
 * /alerts_users/delete/{id}:
 *    delete:
 *      tags: [Alerts_users]
 *      summary: Allow deleting a user of alerts
 *      description: Pass the ID of the user of alerts you wish to delete in the URL and it's done.
 *      responses:
 *         200:
 *          description: alerts successfully deleted
 *         
 */
router.delete('/delete/:id', alertsUsersController.deleteOneById)

module.exports = router