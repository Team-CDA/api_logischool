const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const groupController = require ("../controllers/groups-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Group:
 *          type: object
 *          required: 
 *              - group
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le groupe
 *             group:
 *               type: string
 *               description: Le nom du groupe                
 *             createdAt:
 *               type: date
 *               description: La date à laquelle le groupe a été créé
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification du groupe
 *          example: 
 *             id: 1
 *             group: "Administrateur"  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /groups:
 *    get:
 *      tags: [Groups]
 *      summary: Récupère la liste de tous les groupes
 *      description: Récupère la liste de tous les groupes
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Group'
 *         404:
 *            description: the groups table was not found
 */
router.get('/', groupController.getAll)

/** 
 * @swagger
 * 
 * /groups/{id}:
 *    get:
 *      tags: [Groups]
 *      summary: Récupère un groupe en fonction de son id
 *      description: Récupère un groupe en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Group'
 *         404:
 *            description: the groups table was not found
 */
router.get('/:id', groupController.getOneById)


/** 
 * @swagger
 * 
 * /groups/create:
 *    post:
 *      tags: [Groups]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Group'
 *      summary: Permet d'ajouter un nouveau groupe
 *      description: En fournissant un nom, vous pouvez créer un nouveau groupe.
 *      responses: 
 *         200:
 *            description: Group successfully created
 * 
 *         
 */
router.post('/create', groupController.createOne)


/** 
 * @swagger
 * 
 * /groups/update/{id}:
 *    patch:
 *      tags: [Groups]
 *      summary: Permet La modification d'un groupe
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Group'
 *    description: Grâce à l'id d'un groupe vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: Group successfully updated
 *         
 */
router.patch('/update/:id', groupController.updateOneById)


/** 
 * @swagger
 * 
 * /groups/delete/{id}:
 *    delete:
 *      tags: [Groups]
 *      summary: Permet La suppressin d'un groupe
 *      description: Passer l'id du groupe que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: Group successfully deleted
 *         
 */
router.delete('/delete/:id', groupController.deleteOneById)


/** 
 * @swagger
 * 
 * /groups/deleteAll:
 *    delete:
 *      tags: [Groups]
 *      summary: Permet La suppression de tous les groupes (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Groups successfully deleted
 *         
 */
router.delete('/deleteAll', groupController.deleteAll)

module.exports = router