const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const eventController = require ("../controllers/events-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récupérer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Event:
 *          type: object
 *          required: 
 *              - event
 *          properties: 
 *             id:
 *               type: integer
 *               description: The event id.
 *             message:
 *               type: string
 *               description: The event message.              
 *             starting_date:
 *               type: date
 *               description: The event starting date.
 *             ending_date:
 *               type: date
 *               description: The event ending date.
 *          example: 
 *             id: 1
 *             message: "Bonjour, nous vous informons qu'une grève des professeurs aura lieu le 14 décembre 2022. Merci de votre compréhension."  
 *             starting_date: "2021-12-14 12:00:00"
 *             ending_date: "2021-12-14 12:00:00"
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /events:
 *    get:
 *      tags: [Events]
 *      summary: Rerieve all events
 *      description: You can retrieve all events by using this route.
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Event'
 *         404:
 *            description: the events table was not found
 */
router.get('/', eventController.getAll)

/** 
 * @swagger
 * 
 * /events/{id}:
 *    get:
 *      tags: [Events]
 *      summary: Retrieve one event by id
 *      description: You can retrieve an event by passing the id of the event in the url.
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Event'
 *         404:
 *            description: the events table was not found
 */
router.get('/:id', eventController.getOneById)


/** 
 * @swagger
 * 
 * /events/create:
 *    post:
 *      tags: [Events]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Event'
 *      summary: Allows you to create an event
 *      description: When you create an event, you must pass the message, starting_date and ending_date in the body of the request.
 *      responses: 
 *         200:
 *            description: Event successfully created
 * 
 *         
 */
router.post('/create', eventController.createOne)


/** 
 * @swagger
 * 
 * /events/update/{id}:
 *    patch:
 *      tags: [Events]
 *      summary: Allows you to update an event
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Event'
 *    description: When you update an event you could pass the message, starting_date and ending_date in the body of the request.
 *    responses:
 *         200:
 *          description: Event successfully updated
 *         
 */
router.patch('/update/:id', eventController.updateOneById)


/** 
 * @swagger
 * 
 * /events/delete/{id}:
 *    delete:
 *      tags: [Events]
 *      summary: Allows you to delete an event
 *      description: To delete an event you must pass the id of the event in the url.
 *      responses:
 *         200:
 *          description: Event successfully deleted
 *         
 */
router.delete('/delete/:id', eventController.deleteOneById)


/** 
 * @swagger
 * 
 * /events/deleteAll:
 *    delete:
 *      tags: [Events]
 *      summary: Allows you to delete all events
 *      description: Allows you to delete all events.
 *      responses:
 *         200:
 *          description: Events successfully deleted
 *         
 */
router.delete('/deleteAll', eventController.deleteAll)

module.exports = router