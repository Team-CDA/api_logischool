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
 *               description: L'id qui représente le building
 *             name:
 *               type: string
 *               description: Le nom du building
 *             id_establishment:
 *               type: integer
 *               description: L'id de l'établissement lié               
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
 *      summary: Récupère la liste de tout les buildings
 *      description: Récupère la liste de tout les buildings
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
 *      summary: Récupère un building en fonction de son id
 *      description: Récupère un building en fonction de son id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: L'id du building que vous souhaitez récuperer.
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
 *      summary: Récupère tous les buildings d'un établissement
 *      description: Grâce à l'id d'un établissement, permet de récuperer la liste de tout les buildings.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: L'id de l'établissement.
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
 *      summary: Mettre à jour un building
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/buildings'
 *      description: remplace les valeurs en base par celles passées dans la requête
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
 *          description: L'id du building que vous souhaitez supprimer.
 *      summary: Permet la suppression d'un building grâce à son id.
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
 *      summary: Permet d'ajouter une nouvelle room
 *      description: Permet la création d'une nouvelle room à partir des données envoyées. La combinaison name + id_building doit être unique
 *      responses: 
 *         200:
 *            description: building successfully created
 * 
 *         
 */
// router.post('/create', buildingsController.createOne)

module.exports = router