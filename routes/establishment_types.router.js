const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const establishment_typesController = require ("../controllers/establishment_types-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Establishment_types:
 *          type: object
 *          required: 
 *              - establishment_types
 *          properties: 
 *             id:
 *               type: integer
 *               description: The id of the establishment_types
 *             establishment_types:
 *               type: string
 *               description: The name of the establishment_types          
 *             createdAt:
 *               type: date
 *               description: The date when the establishment_types was created
 *             updatedAt:
 *               type: date
 *               description: The date of the last modification of the establishment_types
 *          example: 
 *             id: 1
 *             establishment_types: "CM2"  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /establishments:
 *    get:
 *      tags: [establishments]
 *      summary: Retrieve the list of establishments
 *      description: Retrieve the list of establishments
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Establishment_types'
 *         404:
 *            description: the establishments table was not found
 */
router.get('/', establishment_typesController.getAll)

/** 
 * @swagger
 * 
 * /establishments/{id}:
 *    get:
 *      tags: [establishments]
 *      summary: Retrieve a establishment_types by its id
 *      description: Retrieve a establishment_types by its id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Establishment_types'
 *         404:
 *            description: the establishments table was not found
 */
router.get('/:id', establishment_typesController.getOneById)


/** 
 * @swagger
 * 
 * /establishments/create:
 *    post:
 *      tags: [establishments]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Establishment_types'
 *      summary: Allow you to create a new establishment_types
 *      description: When you create a new establishment_types, you have to give the name of the establishment_types.
 *      responses: 
 *         200:
 *            description: Establishment_types successfully created
 * 
 *         
 */
router.post('/create', establishment_typesController.createOne)


/** 
 * @swagger
 * 
 * /establishments/update/{id}:
 *    patch:
 *      tags: [establishments]
 *      summary: Allow you to update a establishment_types
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Establishment_types'
 *    description: You have to pass the id of the establishment_types you want to update in the url and the new name of the establishment_types in the body.
 *    responses:
 *         200:
 *          description: Establishment_types successfully updated
 *         
 */
router.patch('/update/:id', establishment_typesController.updateOneById)


/** 
 * @swagger
 * 
 * /establishments/delete/{id}:
 *    delete:
 *      tags: [establishments]
 *      summary: Allow you to delete a establishment_types
 *      description: You have to pass the id of the establishment_types you want to delete in the url.
 *      responses:
 *         200:
 *          description: Establishment_types successfully deleted
 *         
 */
router.delete('/delete/:id', establishment_typesController.deleteOneById)


/** 
 * @swagger
 * 
 * /establishments/deleteAll:
 *    delete:
 *      tags: [establishments]
 *      summary: Allow you to delete all the establishments
 *      description: Delete all the establishments.
 *      responses:
 *         200:
 *          description: establishments successfully deleted
 *         
 */
router.delete('/deleteAll', establishment_typesController.deleteAll)

module.exports = router