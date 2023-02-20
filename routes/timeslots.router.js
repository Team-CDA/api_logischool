const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const timeslotController = require ("../controllers/timeslots-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récupérer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Timeslot:
 *          type: object
 *          required: 
 *              - timeslot
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le timeslot
 *             slot_duration:
 *               type: time
 *               description: La durée du timeslot                
 *          example: 
 *             id: 1
 *             slot_duration: "00:60:00"  
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /timeslots:
 *    get:
 *      tags: [Timeslots]
 *      summary: Récupère la liste de tous les timeslots
 *      description: Récupère la liste de tous les timeslots
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Timeslot'
 *         404:
 *            description: the timeslots table was not found
 */
router.get('/', timeslotController.getAll)

/** 
 * @swagger
 * 
 * /timeslots/{id}:
 *    get:
 *      tags: [Timeslots]
 *      summary: Récupère un timeslot en fonction de son id
 *      description: Récupère un timeslot en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Timeslot'
 *         404:
 *            description: the timeslots table was not found
 */
router.get('/:id', timeslotController.getOneById)


/** 
 * @swagger
 * 
 * /timeslots/create:
 *    post:
 *      tags: [Timeslots]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Timeslot'
 *      summary: Permet d'ajouter un nouveau timeslot
 *      description: En fournissant un nom, vous pouvez créer un nouveau timeslot.
 *      responses: 
 *         200:
 *            description: Timeslot successfully created
 * 
 *         
 */
router.post('/create', timeslotController.createOne)


/** 
 * @swagger
 * 
 * /timeslots/update/{id}:
 *    patch:
 *      tags: [Timeslots]
 *      summary: Permet La modification d'un timeslot
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Timeslot'
 *    description: Grâce à l'id d'un timeslot vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: Timeslot successfully updated
 *         
 */
router.patch('/update/:id', timeslotController.updateOneById)


/** 
 * @swagger
 * 
 * /timeslots/delete/{id}:
 *    delete:
 *      tags: [Timeslots]
 *      summary: Permet La suppression d'un timeslot
 *      description: Passer l'id de l'timeslot que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: Timeslot successfully deleted
 *         
 */
router.delete('/delete/:id', timeslotController.deleteOneById)


/** 
 * @swagger
 * 
 * /timeslots/deleteAll:
 *    delete:
 *      tags: [Timeslots]
 *      summary: Permet La suppression de tous les timeslots (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Timeslots successfully deleted
 *         
 */
router.delete('/deleteAll', timeslotController.deleteAll)

module.exports = router