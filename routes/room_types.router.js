const { Router } = require ("express")
const roomTypesController = require("../controllers/room_types-controller")
const router = Router()

/**
 * @swagger
 *  components: 
 *    schemas:
 *       Types de salle:
 *          type: object
 *          required: 
 *              - room_type
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le type de salle
 *             type:
 *               type: string
 *               description: Le nom du type de salle              
 *             createdAt:
 *               type: date
 *               description: La date à laquelle le type de salle a été créé
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification du type de salle
 *          example: 
 *             id: 1
 *             type: "Manifestation"  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */

/** 
 * @swagger
 * 
 * /room_types:
 *    get:
 *      tags: [Type de salles]
 *      summary: Récupère la liste des types de salle
 *      description: Récupère la liste de types de salle
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/', roomTypesController.getAll)

/** 
 * @swagger
 * 
 * /room_types:
 *    get:
 *      tags: [Types de salle]
 *      summary: Récupère un type de salle par son id
 *      description: Récupère un type de salle par son id
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/:id', roomTypesController.getOneById)

/** 
 * @swagger
 * 
 * /room_types/create:
 *    post:
 *      tags: [Types de salle]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/room_types'
 *      summary: Permet d'ajouter un type de salle
 *      description: Permet d'ajouter un type de salle.
 *      responses: 
 *         200:
 *            description: alert type successfully fetched
 */
router.post('/create', roomTypesController.createOne)


/** 
 * @swagger
 * 
 * /room_types/update/{id}:
 *    patch:
 *      tags: [Types de salle]
 *      summary: Permet La modification d'un type de salle
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/room_types'
 *    description: Grâce à l'id d'un type de salle vous pouvez la modifier.
 *    responses:
 *         200:
 *          description: alert type successfully updated
 *         
 */
router.patch('/update/:id', roomTypesController.updateOneById)

/** 
 * @swagger
 * 
 * /room_types/delete/{id}:
 *    delete:
 *      tags: [Types de salle]
 *      summary: Permet La suppression d'un type de salle
 *      description: Passer l'id du type de salle que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: room types successfully deleted
 *         
 */
router.delete('/delete/:id', roomTypesController.deleteOneById)

module.exports = router