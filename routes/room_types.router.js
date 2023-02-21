const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const room_typesController = require ("../controllers/room_types-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Room_types:
 *          type: object
 *          required: 
 *              - room_type
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente la room_type
 *             room_type:
 *               type: string
 *               description: Le type de la room_type
 *          example: 
 *            id: 1
 *            room_type: "B01"
 *  
 * 
 */


/** 
 * @swagger
 * 
 * /room_types:
 *    get:
 *      tags: [Room_types]
 *      summary: Récupère la liste de tous les room_types
 *      description: Récupère la liste de toutes les room_types
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Room_types'
 *         404:
 *            description: the room_types table was not found
 */
router.get('/', room_typesController.getAll)

/** 
 * @swagger
 * 
 * /room_types/{id}:
 *    get:
 *      tags: [Room_types]
 *      summary: Récupère un room_type en fonction de son id
 *      description: Récupère un room_type en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Room_types'
 *         404:
 *            description: the room_types table was not found
 */
router.get('/:id', room_typesController.getOneById)


/** 
 * @swagger
 * 
 * /room_types/create:
 *    post:
 *      tags: [Room_types]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Room_types'
 *      summary: Permet d'ajouter un nouveau type de room_type
 *      description: En fournissant un nom, vous pouvez créer une nouvelle room_type.
 *      responses: 
 *         200:
 *            description: Salle successfully created
 * 
 *         
 */
router.post('/create', room_typesController.createOne)


/** 
 * @swagger
 * 
 * /room_types/update/{id}:
 *    patch:
 *      tags: [Room_types]
 *      summary: Permet La modification d'une room_type
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Room_types'
 *    description: Grâce à l'id d'une room_type vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: room_type successfully updated
 *         
 */
router.patch('/update/:id', room_typesController.updateOneById)


/** 
 * @swagger
 * 
 * /room_types/delete/{id}:
 *    delete:
 *      tags: [Room_types]
 *      summary: Permet La suppression d'une room_type
 *      description: Passer l'id du room_type que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: room_type successfully deleted
 *         
 */
router.delete('/delete/:id', room_typesController.deleteOneById)


/** 
 * @swagger
 * 
 * /room_types/deleteAll:
 *    delete:
 *      tags: [Room_types]
 *      summary: Permet La suppression de toutes les room_types (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: room_types successfully deleted
 *         
 */
router.delete('/deleteAll', room_typesController.deleteAll)

module.exports = router