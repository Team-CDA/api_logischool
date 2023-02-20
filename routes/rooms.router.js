const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const roomsController = require ("../controllers/rooms-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Salle:
 *          type: object
 *          required: 
 *              - salle
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente la salle
 *             salle:
 *               type: string
 *               description: Le nom de la salle                
 *             createdAt:
 *               type: date
 *               description: La date à laquelle la salle a été créé
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification du salle
 *          example: 
 *             id: 1
 *             salle: "B01"  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /salles:
 *    get:
 *      tags: [salles]
 *      summary: Récupère la liste de tous les salles
 *      description: Récupère la liste de toutes les salles
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/salle'
 *         404:
 *            description: the salles table was not found
 */
router.get('/', roomsController.getAll)

/** 
 * @swagger
 * 
 * /salles/{id}:
 *    get:
 *      tags: [salles]
 *      summary: Récupère une salle en fonction de son id
 *      description: Récupère une salle en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Salle'
 *         404:
 *            description: the salles table was not found
 */
router.get('/:id', roomsController.getOneById)


/** 
 * @swagger
 * 
 * /salles/create:
 *    post:
 *      tags: [salles]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Salle'
 *      summary: Permet d'ajouter une nouvelle salle
 *      description: En fournissant un nom, vous pouvez créer une nouvelle salle.
 *      responses: 
 *         200:
 *            description: Salle successfully created
 * 
 *         
 */
router.post('/create', roomsController.createOne)


/** 
 * @swagger
 * 
 * /salles/update/{id}:
 *    patch:
 *      tags: [salles]
 *      summary: Permet La modification d'une salle
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/salle'
 *    description: Grâce à l'id d'une salle vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: salle successfully updated
 *         
 */
router.patch('/update/:id', roomsController.updateOneById)


/** 
 * @swagger
 * 
 * /salles/delete/{id}:
 *    delete:
 *      tags: [salles]
 *      summary: Permet La suppression d'une salle
 *      description: Passer l'id du salle que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: salle successfully deleted
 *         
 */
router.delete('/delete/:id', roomsController.deleteOneById)


/** 
 * @swagger
 * 
 * /salles/deleteAll:
 *    delete:
 *      tags: [salles]
 *      summary: Permet La suppression de toutes les salles (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: salles successfully deleted
 *         
 */
router.delete('/deleteAll', roomsController.deleteAll)

module.exports = router



