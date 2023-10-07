const { Router } = require ("express")
const ClassesController = require("../controllers/Classes-controller")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const classeController = require("../controllers/classes-controller");

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components:
 *    schemas:
 *       Classe:
 *          type: object
 *          required:
 *              - classe
 *          properties:
 *             id:
 *               type: integer
 *               description: The id of the classe
 *             classe:
 *               type: string
 *               description: The name of the classe
 *             createdAt:
 *               type: date
 *               description: The date when the classe was created
 *             updatedAt:
 *               type: date
 *               description: The date of the last modification of the classe
 *          example:
 *             id: 1
 *             classe: "CM2"
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 *
 *
 */

/**
 * @swagger
 * 
 * /Classes:
 *    get:
 *      tags: [Classes]
 *      summary: Retrieve the list of classes
 *      description: Retrieve the list of classes
 *      responses:
 *         200:
 *            description: Success
 * 
 */
router.get('/', ClassesController.getAll)

/**
 * @swagger
 *
 * /classes-for-teacher/{id}:
 *    get:
 *      tags: [Classes]
 *      summary: Retrieve the list of classes for one specific teacher
 *      description: Retrieve the list of classes for one specific teacher
 *      responses:
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Classe'
 *         404:
 *            description: the classes table was not found
 */
router.get("/teacher/:id", classeController.getAllForOneTeacher);

/**
 * @swagger
 *
 * /classes/{id}:
 *    get:
 *      tags: [Classes]
 *      summary: Retrieve a classe by its id
 *      description: Retrieve a classe by its id
 *      responses:
 *         200:
 *            description: Success
 * 
 */
router.get('/:id', ClassesController.getOneById)

/** 
 * @swagger
 * 
 * /Classes/create:
 *    post:
 *      tags: [Classes]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Classe'
 *      summary: Allow you to create a new classe
 *      description: When you create a new classe, you have to give the name of the classe.
 *      responses:
 *         200:
 *            description: Classe successfully created
 */
router.post('/create', ClassesController.createOne)

/**
 * @swagger
 * 
 * /Classes/update/{id}:
 *    patch:
 *      tags: [Classes]
 *      summary: Allow you to update a classe
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Classe'
 *    description: You have to pass the id of the classe you want to update in the url and the new name of the classe in the body.
 *    responses:
 *         200:
 *          description: alert types successfully updated
 *         
 */
router.patch('/update/:id', ClassesController.updateOneById)

/** 
 * @swagger
 * 
 * /Classes/delete/{id}:
 *    delete:
 *      tags: [Classes]
 *      summary: Allow you to delete a classe
 *      description: You have to pass the id of the classe you want to delete in the url.
 *      responses:
 *         200:
 *          description: class successfully deleted
 *         
 */
router.delete('/delete/:id', ClassesController.deleteOneById)

/**
 * @swagger
 * 
 * /Classes/deleteAll:
 *    delete:
 *      tags: [Classes]
 *      summary: Allow you to delete all the classes
 *      description: Delete all the classes.
 *      responses:
 *         200:
 *          description: Classes successfully deleted
 *
 */
router.delete('/deleteAll', ClassesController.deleteAll)

module.exports = router;
