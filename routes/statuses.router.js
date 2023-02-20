const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const statusController = require ("../controllers/statuses-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Statut:
 *          type: object
 *          required: 
 *              - statut
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le statut
 *             statut:
 *               type: string
 *               description: Le nom du statut                
 *             createdAt:
 *               type: date
 *               description: La date à laquelle le statut a été créé
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification du statut
 *          example: 
 *             id: 1
 *             status: "Titulaire"  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /statuses:
 *    get:
 *      tags: [Statuses]
 *      summary: Récupère la liste de tous les statuts
 *      description: Récupère la liste de tous les statuts
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Status'
 *         404:
 *            description: the statuses table was not found
 */
router.get('/', statusController.getAll)

/** 
 * @swagger
 * 
 * /statuses/{id}:
 *    get:
 *      tags: [Statuses]
 *      summary: Récupère un statut en fonction de son id
 *      description: Récupère un statut en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Status'
 *         404:
 *            description: the statuses table was not found
 */
router.get('/:id', statusController.getOneById)


/** 
 * @swagger
 * 
 * /statuses/create:
 *    post:
 *      tags: [Statuses]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Status'
 *      summary: Permet d'ajouter un nouveau statut
 *      description: En fournissant un nom, vous pouvez créer un nouveau statut.
 *      responses: 
 *         200:
 *            description: Status successfully created
 * 
 *         
 */
router.post('/create', statusController.createOne)


/** 
 * @swagger
 * 
 * /statuses/update/{id}:
 *    patch:
 *      tags: [Statuses]
 *      summary: Permet La modification d'un statut
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Status'
 *    description: Grâce à l'id d'un statut vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: Status successfully updated
 *         
 */
router.patch('/update/:id', statusController.updateOneById)


/** 
 * @swagger
 * 
 * /statuses/delete/{id}:
 *    delete:
 *      tags: [Statuses]
 *      summary: Permet La suppression d'un statut
 *      description: Passer l'id du statut que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: Status successfully deleted
 *         
 */
router.delete('/delete/:id', statusController.deleteOneById)


/** 
 * @swagger
 * 
 * /statuses/deleteAll:
 *    delete:
 *      tags: [Statuses]
 *      summary: Permet La suppression de tous les statuts (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Statuses successfully deleted
 *         
 */
router.delete('/deleteAll', statusController.deleteAll)

module.exports = router