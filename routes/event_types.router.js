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
 *               description: L'id qui représente le type d'event
 *             name:
 *               type: string
 *               description: Le nom du type d'event                
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
 *      summary: Récupère la liste de tous les types d'events
 *      description: Récupère la liste de tous les types d'events
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
 *      summary: Récupère un event en fonction de son id
 *      description: Récupère un event en fonction de son id
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
 *      summary: Permet d'ajouter un nouveau type d'event
 *      description: En fournissant un nom, vous pouvez créer un nouveau type d'event.
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
 *      summary: Permet La modification d'un type d'event
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Event_types'
 *    description: Grâce à l'id d'un type d'event vous pouvez changer le nom correspondant.
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
 *      summary: Permet La suppression d'un type d'event
 *      description: Passer l'id du type d'event que vous souhaitez supprimer en url et le tour est joué.
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
 *      summary: Permet La suppression de tous les type d'event (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Event_type successfully deleted
 *         
 */
router.delete('/deleteAll', event_typeController.deleteAll)

module.exports = router