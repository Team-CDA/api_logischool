const { Router } = require ("express")
const events_groupsController = require("../controllers/events_groups-controller")
const router = Router()

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Events_groups:
 *          type: object
 *          required: 
 *              - events_groups
 *          properties: 
 *             events_groups:
 *               type: string
 *               description: Id of the events group.
 *          example: 
 *             id: 1
 *             id_event: "1"
 *             id_group: "1"
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 */

/** 
 * @swagger
 * 
 * /events_groups:     
 *    get:
 *      tags: [Events Groups]
 *      summary: Retrieve all events groups
 *      responses: 
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Events_groups'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/', events_groupsController.getAll)

/** 
 * @swagger
 * 
 * /events_groups/{id}:
 *    get:
 *      tags: [Events Groups]
 *      summary: Retrieve one events group by id
 *      description: When you pass the id of an events group, you get the events group.
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Events_groups'
 *         404:
 *            description: the table was not found
 */
router.get('/:id', events_groupsController.getOneById)

/** 
 * @swagger
 * 
 * /events_groups/create:
 *    post:
 *      tags: [Events Groups]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Events_groups'
 *      summary: Allow to create an events group
 *      description: You can create an events group by passing the id of the events group.
 *      responses: 
 *         200:
 *            description: events groups successfully fetched
 */
router.post('/create', events_groupsController.createOne)

/** 
 * @swagger
 * 
 * /events_groups/update/{id}:
 *    patch:
 *      tags: [Events Groups]
 *      summary: Allow to update an events group
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Events_groups'
 *    description: You can update an events group by passing the id of the events group.
 *    responses:
 *         200:
 *          description: events groups successfully updated
 *         
 */
router.patch('/update/:id', events_groupsController.updateOneById)

/** 
 * @swagger
 * 
 * /events_groups/delete/{id}:
 *    delete:
 *      tags: [Events Groups]
 *      summary: Allow to delete an events group
 *      description: You can delete an events group by passing the id of the events group.
 *      responses:
 *         200:
 *          description: alert types successfully deleted
 *         
 */
router.delete('/delete/:id', events_groupsController.deleteOneById)

module.exports = router