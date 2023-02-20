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
 *               description: L'id qui représente l'event
 *             message:
 *               type: string
 *               description: Le message de l'event                
 *             starting_date:
 *               type: date
 *               description: La date à laquelle l'event a été créé
 *             ending_date:
 *               type: date
 *               description: La date de la dernière modification de l'event
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
 *      summary: Récupère la liste de tous les events
 *      description: Récupère la liste de tous les events
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
 *      summary: Permet d'ajouter un nouveau event
 *      description: En fournissant un nom, vous pouvez créer un nouveau event.
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
 *      summary: Permet La modification d'un event
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Event'
 *    description: Grâce à l'id d'un event vous pouvez changer le nom correspondant.
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
 *      summary: Permet La suppression d'un event
 *      description: Passer l'id de l'event que vous souhaitez supprimer en url et le tour est joué.
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
 *      summary: Permet La suppression de tous les events (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Events successfully deleted
 *         
 */
router.delete('/deleteAll', eventController.deleteAll)

module.exports = router