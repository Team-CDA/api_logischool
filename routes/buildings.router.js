const { Router } = require ("express")
const router = Router()
const buildingsController = require ("../controllers/buildings-controller")


/**
 * @swagger
 *  components: 
 *    schemas:
 *       buildings:
 *          type: object
 *          required: 
 *              - role
 *          properties: 
 *             id:
 *               type: integer
 *               description: The ID that represents the building
 *             name:
 *               type: string
 *               description: The name of the building
 *             id_establishment:
 *               type: integer
 *               description: The ID that represents the establishment         
 *          example: 
 *             id: 1
 *             name: A  
 *             id_establishment: 1
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /buildings/:
 *    get:
 *      tags: [Buildings]
 *      summary: Retrieve the list of buildings
 *      description: Retrieve the list of buildings
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/buildings'
 *         404:
 *            description: the buildings table was not found
 */
router.get('/', buildingsController.getAll)


/** 
 * @swagger
 * 
 * /buildings/{id}:
 *    get:
 *      tags: [Buildings]
 *      summary: Retrieve a building by its ID
 *      description: Retrieve a building by its ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The id of the building to retrieve.
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/buildings'
 *         404:
 *            description: the buildings table was not found
 */
router.get('/:id', buildingsController.getOneById)

/** 
 * @swagger
 * 
 * /buildings/establishment/{id}:
 *    get:
 *      tags: [Buildings]
 *      summary: Retrieve all buildings by their establishment ID
 *      description: Retrieve all buildings by their establishment ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The id of the establishment to retrieve.
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/buildings'
 *         404:
 *            description: the buildings table was not found
 */
router.get('/building/:id', buildingsController.getByEstablishment)


/** 
 * @swagger
 * 
 * /buildings/update:
 *    put:
 *      tags: [Buildings]
 *      summary: Update a building
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/buildings'
 *      description: Replace the values in the database with those passed in the request.
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/buildings'
 *         404:
 *            description: the buildings table was not found
 */
router.put('/update', buildingsController.updateOneById)

/** 
 * @swagger
 * 
 * /buildings/delete/{id}:
 *    delete:
 *      tags: [Buildings]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The id of the building to delete.
 *      summary: Allows you to delete a building by its ID.
 *      description: 
 *      responses: 
 *         200:
 *            description: building successfully deleted
 *         404:
 *            description: the buildings table was not found
 *         
 */
router.delete('/delete/:id', buildingsController.deleteOneById)

/** 
 * @swagger
 * 
 * /buildings/create:
 *    post:
 *      tags: [Buildings]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Rooms'
 *      summary: Allow you to add a new building
 *      description: Permet la création d'un nouveau building à partir des données envoyées. La combinaison name + id_building doit être unique
 *      responses: 
 *         200:
 *            description: building successfully created
 * 
 *         
 */
router.post('/create/:id', buildingsController.createOne)

module.exports = router