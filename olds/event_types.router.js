const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const event_typeController = require ("../controllers/event_types-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récupérer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Event_types:
 *          type: object
 *          required: 
 *              - event_type
 *          properties: 
 *             id:
 *               type: integer
 *               description: The id of the event_type
 *             name:
 *               type: string
 *               description: The name of the event_type               
 *          example: 
 *             id: 1
 *             name: "Grève"  
 *
 * 
 */


/** 
 * @swagger
 * 
 * /event_types:
 *    get:
 *      tags: [Event_types]
 *      summary: Retrieve the list of event_types
 *      description: Retrieve the list of event_types.
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Event_types'
 *         404:
 *            description: the events table was not found
 */
router.get('/', event_typeController.getAll)

/** 
 * @swagger
 * 
 * /event_types/{id}:
 *    get:
 *      tags: [Event_types]
 *      summary: Retrieve one event_type
 *      description: Retrieve one event_type with the id.
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Event_types'
 *         404:
 *            description: the event_types table was not found
 */
router.get('/:id', event_typeController.getOneById)


/** 
 * @swagger
 * 
 * /event_types/create:
 *    post:
 *      tags: [Event_types]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Event_types'
 *      summary: Allows you to create a new event_type
 *      description: When you create a new event_type, you must enter the name of the event_type.
 *      responses: 
 *         200:
 *            description: Event_types successfully created
 * 
 *         
 */
router.post('/create', event_typeController.createOne)


/** 
 * @swagger
 * 
 * /event_types/update/{id}:
 *    patch:
 *      tags: [Event_types]
 *      summary: Allows you to update an event_type
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Event_types'
 *    description: When you update an event_type, you must enter the name and the id of the event_type.
 *    responses:
 *         200:
 *          description: Event_types successfully updated
 *         
 */
router.patch('/update/:id', event_typeController.updateOneById)


/** 
 * @swagger
 * 
 * /event_types/delete/{id}:
 *    delete:
 *      tags: [Event_types]
 *      summary: Allows you to delete an event_type
 *      description: Pass the id of the event_type you want to delete.
 *      responses:
 *         200:
 *          description: Event_types successfully deleted
 *         
 */
router.delete('/delete/:id', event_typeController.deleteOneById) 


/** 
 * @swagger
 * 
 * /event_types/deleteAll:
 *    delete:
 *      tags: [Event_types]
 *      summary: Allows you to delete all event_types
 *      description: Delete all event_types.
 *      responses:
 *         200:
 *          description: Event_type successfully deleted
 *         
 */
router.delete('/deleteAll', event_typeController.deleteAll)

module.exports = router