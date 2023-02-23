const { Router } = require ("express")
const alertTypesController = require("../controllers/alert_types-controller")
const router = Router()

/**
 * @swagger
 *  components: 
 *    schemas:
 *       Alert_types:
 *          type: object
 *          required: 
 *              - alert_type
 *          properties: 
 *             id:
 *               type: integer
 *               description: The ID that represents the type of alert
 *             type:
 *               type: string
 *               description: The name of the type of alert               
 *             createdAt:
 *               type: date
 *               description: The date when the type of alert was created
 *             updatedAt:
 *               type: date
 *               description: The date of the last modification of the type of alert
 *          example: 
 *             id: 1
 *             type: "Manifestation"  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */

/** 
 * @swagger
 * 
 * /alert_types:
 *    get:
 *      tags: [Alert_types]
 *      summary: Retrieve the list of types of alerts
 *      description: Retrieve the list of types of alerts
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/', alertTypesController.getAll)

/** 
 * @swagger
 * 
 * /alert_types/{id}:
 *    get:
 *      tags: [Alert_types]
 *      summary: Retrieve a type of alert by its ID
 *      description: Retrieve a type of alert by its ID
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/:id', alertTypesController.getOneById)

/** 
 * @swagger
 * 
 * /alert_types/create:
 *    post:
 *      tags: [Alert_types]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Alert_types'
 *      summary: Allow adding a type of alert
 *      description: Allow adding a type of alert.
 *      responses: 
 *         200:
 *            description: Alert_type successfully created
 */
router.post('/create', alertTypesController.createOne)

/** 
 * @swagger
 * 
 * /alert_types/update/{id}:
 *    patch:
 *      tags: [Alert_types]
 *      summary: Allow modifying a type of alert
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Alert_types'
 *    description: With the ID of a type of alert, you can modify it.
 *    responses:
 *         200:
 *          description: alert type successfully updated
 *         
 */
router.patch('/update/:id', alertTypesController.updateOneById)

/** 
 * @swagger
 * 
 * /alert_types/delete/{id}:
 *    delete:
 *      tags: [Alert_types]
 *      summary: Allow deleting a type of alert
 *      description: Pass the ID of the role you wish to delete in the URL and it's done.
 *      responses:
 *         200:
 *          description: alert types successfully deleted
 *         
 */
router.delete('/delete/:id', alertTypesController.deleteOneById)


// /** 
//  * @swagger
//  * 
//  * /alert_types/deleteAll:
//  *    delete:
//  *      tags: [Alert_types]
//  *      summary: Allow deleting all types of alerts (truncate)
//  *      description: Delete the table by truncating it, so the IDs start from 1 again
//  *      responses:
//  *         200:
//  *          description: alert types successfully deleted
//  *         
//  */
// router.delete('/deleteAll', alertTypesController.deleteAll)

module.exports = router