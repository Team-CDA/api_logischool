const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const signatureController = require ("../controllers/signatures-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       signature:
 *          type: object
 *          required: 
 *              - signature
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le signature
 *             signature:
 *               type: string
 *               description: Le nom du signature                
 *             createdAt:
 *               type: date
 *               description: La date à laquelle le signature a été créé
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification du signature
 *          example: 
 *             id: 1
 *             signature: "Administrateur"  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /signatures:
 *    get:
 *      tags: [signatures]
 *      summary: Récupère la liste de tous les signatures
 *      description: Récupère la liste de tous les signatures
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/signature'
 *         404:
 *            description: the signatures table was not found
 */
router.get('/', signatureController.getAll)

/** 
 * @swagger
 * 
 * /signatures/{id}:
 *    get:
 *      tags: [signatures]
 *      summary: Récupère un signature en fonction de son id
 *      description: Récupère un signature en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/signature'
 *         404:
 *            description: the signatures table was not found
 */
router.get('/:id', signatureController.getOneById)


/** 
 * @swagger
 * 
 * /signatures/create:
 *    post:
 *      tags: [signatures]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/signature'
 *      summary: Permet d'ajouter un nouveau signature
 *      description: En fournissant un nom, vous pouvez créer un nouveau signature.
 *      responses: 
 *         200:
 *            description: signature successfully created
 * 
 *         
 */
router.post('/create', signatureController.createOne)


/** 
 * @swagger
 * 
 * /signatures/update/{id}:
 *    patch:
 *      tags: [signatures]
 *      summary: Permet La modification d'un signature
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/signature'
 *    description: Grâce à l'id d'un signature vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: signature successfully updated
 *         
 */
router.patch('/update/:id', signatureController.updateOneById)


/** 
 * @swagger
 * 
 * /signatures/delete/{id}:
 *    delete:
 *      tags: [signatures]
 *      summary: Permet La suppressin d'un signature
 *      description: Passer l'id du signature que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: signature successfully deleted
 *         
 */
router.delete('/delete/:id', signatureController.deleteOneById)


/** 
 * @swagger
 * 
 * /signatures/deleteAll:
 *    delete:
 *      tags: [signatures]
 *      summary: Permet La suppression de tous les signatures (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: signatures successfully deleted
 *         
 */
router.delete('/deleteAll', signatureController.deleteAll)

module.exports = router