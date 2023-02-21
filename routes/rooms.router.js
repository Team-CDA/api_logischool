const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const roomsController = require ("../controllers/rooms-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Rooms:
 *          type: object
 *          required: 
 *              - role
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente la room
 *             name:
 *               type: string
 *               description: Le nom de la room                
 *             id_room_type:
 *               type: integer
 *               description: L'id du type de room
 *             id_building:
 *               type: integer
 *               description: L'id du batiment auquel est rattaché cette room
 *          example: 
 *             id: 1
 *             name: 101  
 *             id_room_type: 1
 *             id_building: 1
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /rooms/:
 *    get:
 *      tags: [Rooms]
 *      summary: Récupère la liste de toutes les rooms
 *      description: Récupère la liste de toutes les rooms
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Rooms'
 *         404:
 *            description: the rooms table was not found
 */
router.get('/', roomsController.getAll)


/** 
 * @swagger
 * 
 * /rooms/{id}:
 *    get:
 *      tags: [Rooms]
 *      summary: Récupère une room en fonction de son id
 *      description: Récupère une room en fonction de son id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: L'id de la room que vous souhaitez récuperer.
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Rooms'
 *         404:
 *            description: the rooms table was not found
 */
router.get('/:id', roomsController.getOneById)

/** 
 * @swagger
 * 
 * /rooms/building/{id}:
 *    get:
 *      tags: [Rooms]
 *      summary: Récupère toutes les rooms d'un bâtiment
 *      description: Grâce à l'id d'un bâtiment, permet de récuperer la liste de toutes les rooms.
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Rooms'
 *         404:
 *            description: the rooms table was not found
 */
router.get('/building/:id', roomsController.getByBuilding)

/** 
 * @swagger
 * 
 * /rooms/{buildingName}/{roomName}:
 *    get:
 *      tags: [Rooms]
 *      summary: Récupère une room grâce à son nom et son bâtiment
 *      description: En fournissant le nom du bâtiment et le numéro de la room on peut récuperer l'objet complet.
 *      parameters:
 *        - in: path
 *          name: buildingName
 *          schema:
 *            type: string
 *          required: true
 *          description: Le nom du bâtiment
 *        - in: path
 *          name: roomName
 *          schema:
 *            type: string
 *          required: true
 *          description: le nom de la room
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Rooms'
 *         404:
 *            description: the rooms table was not found
 */
router.get('/:buildingName/:roomName', roomsController.getByNames)

/** 
 * @swagger
 * 
 * /rooms/update:
 *    put:
 *      tags: [Rooms]
 *      summary: Mettre à jour une room
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rooms'
 *      description: remplace les valeurs en base par celles passées dans la requête
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Rooms'
 *         404:
 *            description: the rooms table was not found
 */
router.put('/update', roomsController.updateOneById)

/** 
 * @swagger
 * 
 * /rooms/delete/{id}:
 *    delete:
 *      tags: [Rooms]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: L'id de la room que vous souhaitez supprimer.
 *      summary: Permet la suppression d'une room grâce à son id.
 *      description: 
 *      responses: 
 *         200:
 *            description: Room successfully deleted
 *         404:
 *            description: the rooms table was not found
 *         
 */
router.delete('/delete/:id', roomsController.deleteOneById)

/** 
 * @swagger
 * 
 * /rooms/create:
 *    post:
 *      tags: [Rooms]
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
 *            description: Room successfully created
 * 
 *         
 */
router.post('/create', roomsController.createOne)



module.exports = router