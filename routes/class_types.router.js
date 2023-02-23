const { Router } = require ("express")
const classTypesController = require("../controllers/class_types-controller")
const router = Router()

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Class_types:
 *          type: object
 *          required: 
 *              - class_type
 *          properties: 
 *             id:
 *               type: integer
 *               description: The id that represents the type of class
 *             class_type:
 *               type: string
 *               description: The name of the type of class              
 *             createdAt:
 *               type: date
 *               description: The date when the type of class was created
 *             updatedAt:
 *               type: date
 *               description: The date of the last modification of the type of class
 *          example: 
 *             id: 1
 *             class_type: "Primaire"  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /class_types:
 *    get:
 *      tags: [Class_types]
 *      summary: Retrieve the list of type of class
 *      description: Retrieve the list of type of class
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/', classTypesController.getAll)

/** 
 * @swagger
 * 
 * /class_types/{id}:
 *    get:
 *      tags: [Class_types]
 *      summary: Retrieve a type of class by its id
 *      description: Retrieve a type of class by its id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Class_types'
 *         404:
 *            description: the table was not found
 */
router.get('/:id', classTypesController.getOneById)

/** 
 * @swagger
 * 
 * /class_types/create:
 *    post:
 *      tags: [Class_types]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Class_types'
 *      summary: Allow to create a type of class
 *      description: Allow to create a type of class.
 *      responses: 
 *         200:
 *            description: classe_types successfully created
 */
router.post('/create', classTypesController.createOne)


/** 
 * @swagger
 * 
 * /class_types/update/{id}:
 *    patch:
 *      tags: [Class_types]
 *      summary: Allow to update a type of class
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Class_types'
 *    description: You can modify a type of class by its ID.
 *    responses:
 *         200:
 *          description: class_types successfully updated
 *         
 */
router.patch('/update/:id', classTypesController.updateOneById)

/** 
 * @swagger
 * 
 * /class_types/delete/{id}:
 *    delete:
 *      tags: [Class_types]
 *      summary: Allow to delete a type of class
 *      description: Pass the id of the type of class you want to delete.
 *      responses:
 *         200:
 *          description: class_types successfully deleted
 *         
 */
router.delete('/delete/:id', classTypesController.deleteOneById)

module.exports = router