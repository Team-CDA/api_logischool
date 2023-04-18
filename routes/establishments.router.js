const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const etablishmentController = require ("../controllers/establishments-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Etablishment:
 *          type: object
 *          required: 
 *              - etablishment
 *          properties: 
 *             id:
 *               type: integer
 *               description: The id of the etablishment
 *             etablishment:
 *               type: string
 *               description: The name of the etablishment          
 *             createdAt:
 *               type: date
 *               description: The date when the etablishment was created
 *             updatedAt:
 *               type: date
 *               description: The date of the last modification of the etablishment
 *          example: 
 *             id: 1
 *             etablishment: "CM2"  
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
 *                    $ref: '#/components/schemas/Etablishment'
 *         404:
 *            description: the establishments table was not found
 */
router.get('/', etablishmentController.getAll)

/** 
 * @swagger
 * 
 * /establishments/{id}:
 *    get:
 *      tags: [establishments]
 *      summary: Retrieve a etablishment by its id
 *      description: Retrieve a etablishment by its id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Etablishment'
 *         404:
 *            description: the establishments table was not found
 */
router.get('/:id', etablishmentController.getOneById)


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
 *                 $ref: '#/components/schemas/Etablishment'
 *      summary: Allow you to create a new etablishment
 *      description: When you create a new etablishment, you have to give the name of the etablishment.
 *      responses: 
 *         200:
 *            description: Etablishment successfully created
 * 
 *         
 */
router.post('/create', etablishmentController.createOne)


/** 
 * @swagger
 * 
 * /establishments/update/{id}:
 *    patch:
 *      tags: [establishments]
 *      summary: Allow you to update a etablishment
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Etablishment'
 *    description: You have to pass the id of the etablishment you want to update in the url and the new name of the etablishment in the body.
 *    responses:
 *         200:
 *          description: Etablishment successfully updated
 *         
 */
router.patch('/update/:id', etablishmentController.updateOneById)


/** 
 * @swagger
 * 
 * /establishments/delete/{id}:
 *    delete:
 *      tags: [establishments]
 *      summary: Allow you to delete a etablishment
 *      description: You have to pass the id of the etablishment you want to delete in the url.
 *      responses:
 *         200:
 *          description: Etablishment successfully deleted
 *         
 */
router.delete('/delete/:id', etablishmentController.deleteOneById)


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
router.delete('/deleteAll', etablishmentController.deleteAll)

module.exports = router