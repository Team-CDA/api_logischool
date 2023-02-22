const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const eventController = require ("../controllers/lessons-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récupérer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Lesson:
 *          type: object
 *          required: 
 *              - lesson
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente la lesson
 *             lesson_datetime:
 *               type: datetime
 *               description: La date de la lesson                
 *             id_room:
 *               type: integer
 *               description: L'id de la salle de la lesson
 *             id_user:
 *               type: integer
 *               description: L'id de l'utilisateur de la lesson
 *             id_subject:
 *               type: integer
 *               description: L'id de la matière de la lesson
 *             id_timeslot:
 *               type: integer
 *               description: L'id du créneau horaire de la lesson
 *             id_class:
 *               type: integer
 *               description: L'id de la classe de la lesson
 *          example: 
 *             id: 1
 *             lesson_datetime: "2021-12-14 12:00:00"
 *             id_room: 1
 *             id_user: 1
 *             id_subject: 1
 *             id_timeslot: 1
 *             id_class: 1
 *  
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /lessons:
 *    get:
 *      tags: [Lessons]
 *      summary: Récupère la liste de tous les lessons
 *      description: Récupère la liste de tous les lessons
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Lesson'
 *         404:
 *            description: the lessons table was not found
 */
router.get('/', eventController.getAll)

/** 
 * @swagger
 * 
 * /lessons/{id}:
 *    get:
 *      tags: [Lessons]
 *      summary: Récupère une lesson en fonction de son id
 *      description: Récupère une lesson en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Lesson'
 *         404:
 *            description: the lessons table was not found
 */
router.get('/:id', eventController.getOneById)


/** 
 * @swagger
 * 
 * /lessons/create:
 *    post:
 *      tags: [Lessons]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Lesson'
 *      summary: Permet d'ajouter une nouvelle lesson
 *      description: En fournissant un nom, vous pouvez créer un nouveau lesson.
 *      responses: 
 *         200:
 *            description: Lesson successfully created
 * 
 *         
 */
router.post('/create', eventController.createOne)


/** 
 * @swagger
 * 
 * /lessons/update/{id}:
 *    patch:
 *      tags: [Lessons]
 *      summary: Permet La modification d'une lesson
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Lesson'
 *    description: Grâce à l'id d'une lesson vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: Lesson successfully updated
 *         
 */
router.patch('/update/:id', eventController.updateOneById)


/** 
 * @swagger
 * 
 * /lessons/delete/{id}:
 *    delete:
 *      tags: [Lessons]
 *      summary: Permet La suppression d'une lesson
 *      description: Passer l'id de la lesson que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: Lesson successfully deleted
 *         
 */
router.delete('/delete/:id', eventController.deleteOneById)


/** 
 * @swagger
 * 
 * /lessons/deleteAll:
 *    delete:
 *      tags: [Lessons]
 *      summary: Permet La suppression de tous les lessons (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Lessons successfully deleted
 *         
 */
router.delete('/deleteAll', eventController.deleteAll)

module.exports = router