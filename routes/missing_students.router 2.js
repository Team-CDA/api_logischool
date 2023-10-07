const { Router } = require ("express")
const router = Router()
const missing_studentsController = require ("../controllers/missing_students-controller")

/**
 * @swagger
 *  components: 
 *    schemas:
 *       MissingStudents:
 *          type: object
 *          required: 
 *              - id_user
 *              - id_lesson
 *              - justified
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente l'absence
 *             id_user:
 *               type: integer
 *               description: L'id qui représente l'étudiant
 *             id_lesson:
 *               type: integer
 *               description: L'id qui représente la leçon
 *             justified:
 *               type: boolean
 *               description: Si l'absence est justifiée ou non             
 *          example: 
 *               id: 1
 *               id_user: 1
 *               id_lesson: 1
 *               justified: false  
 * 
 */

/** 
 * @swagger
 * 
 * /missing_students:
 *    get:
 *      tags: [MissingStudents]
 *      summary: Récupère la liste de tous les étudiants absents
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/MissingStudents'
 */
router.get('/', missing_studentsController.getAll)

/** 
 * @swagger
 * 
 * /missing_students/{id}:
 *    get:
 *      tags: [MissingStudents]
 *      summary: Récupère une absence en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/MissingStudents'
 */
router.get('/:id', missing_studentsController.getOneById)

/** 
 * @swagger
 * 
 * /missing_students:
 *    post:
 *      tags: [MissingStudents]
 *      summary: Permet d'ajouter une nouvelle absence
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/MissingStudents'
 *      responses: 
 *         201:
 *            description: Absence successfully created
 *         
 */
router.post('/', missing_studentsController.createOne)

/** 
 * @swagger
 * 
 * /missing_students/{id}:
 *    put:
 *      tags: [MissingStudents]
 *      summary: Permet la modification d'une absence
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/MissingStudents'
 *      responses: 
 *         201:
 *            description: Absence successfully updated
 *         
 */
router.put('/:id', missing_studentsController.updateOneById)


/** 
 * @swagger
 * 
 * /missing_students/user/{userId}/{absenceId}:
 *    get:
 *      tags: [MissingStudents]
 *      summary: Récupère une absence spécifique pour un utilisateur spécifique en fonction de leur ID
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/MissingStudents'
 */
router.get('/user/:userId/:absenceId', missing_studentsController.getOneByIdUser)


/** 
 * @swagger
 * 
 * /missing_students/user/{id}:
 *    get:
 *      tags: [MissingStudents]
 *      summary: Récupère toutes les absences d'un utilisateur en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/MissingStudents'
 */
router.get('/user/:id', missing_studentsController.getAllByIdUser)



/** 
 * @swagger
 * 
 * /missing_students/unjustified/{userId}:
 *    get:
 *      tags: [MissingStudents]
 *    summary: Récupère toutes les absences non justifiées pour un utilisateur spécifique en fonction de son ID
 *    responses: 
 *       200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/MissingStudents'
 */
router.get('/unjustified/:userId', missing_studentsController.getAllUnjustifiedByUserId);



router.get('/absences-with-schedule/:userId', missing_studentsController.getAbsencesWithSchedule);


module.exports = router
