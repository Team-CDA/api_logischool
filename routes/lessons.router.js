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
 *               description: Lesson id
 *             lesson_datetime:
 *               type: datetime
 *               description: Date and time of the lesson             
 *             id_room:
 *               type: integer
 *               description: Room id
 *             id_user:
 *               type: integer
 *               description: Id of the user who created the lesson
 *             id_subject:
 *               type: integer
 *               description: Id of the subject of the lesson
 *             id_timeslot:
 *               type: integer
 *               description: Id of the timeslot of the lesson
 *             id_class:
 *               type: integer
 *               description: Id of the class of the lesson
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
 *      summary: Retrieves the list of all lessons
 *      description: Retrieves the list of all lessons
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
 *      summary: Retrieves a lesson by id
 *      description: With the id of a lesson you can retrieve the corresponding lesson.
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
 *      summary: Allows you to create a new lesson
 *      description: When you pass a lesson name in the body, you create a lesson with this name
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
 *      summary: Allows you to update a lesson
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Lesson'
 *    description: With the id of a lesson you can update the corresponding lesson.
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
 *      summary: Allows you to delete a lesson
 *      description: Pass the id of the lesson you want to delete in the URL
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
 *      summary: Allows you to delete all lessons
 *      description: Delete all lessons
 *      responses:
 *         200:
 *          description: Lessons successfully deleted
 *         
 */
router.delete('/deleteAll', eventController.deleteAll)

module.exports = router