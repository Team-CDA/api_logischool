const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const users_groupController = require ("../controllers/users_groups-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Users_group:
 *          type: object
 *          required: 
 *              - users_group
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le groupe d'utilisateurs
 *             id_group:
 *               type: integer
 *               description: L'id du groupe                
 *             id_user:
 *               type: integer
 *               description: L'id de l'utilisateur lié au groupe
 *          example: 
 *             id: 1
 *             id_group: 1  
 *             id_user: 1
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /users_groups:
 *    get:
 *      tags: [Users_groups]
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
 *                    $ref: '#/components/schemas/Users_group'
 *         404:
 *            description: the users_groups table was not found
 */
router.get('/', users_groupController.getAll)

/** 
 * @swagger
 * 
 * /users_groups/{id}:
 *    get:
 *      tags: [Users_groups]
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
 *                    $ref: '#/components/schemas/Users_group'
 *         404:
 *            description: the users_groups table was not found
 */
router.get('/:id', users_groupController.getOneById)


/** 
 * @swagger
 * 
 * /users_groups/create:
 *    post:
 *      tags: [Users_groups]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Users_group'
 *      summary: Permet d'ajouter un nouveau groupe
 *      description: En fournissant un nom, vous pouvez créer un nouveau groupe d'utilisateur.
 *      responses: 
 *         200:
 *            description: Users_group successfully created
 * 
 *         
 */
router.post('/create', users_groupController.createOne)


/** 
 * @swagger
 * 
 * /users_groups/update/{id}:
 *    patch:
 *      tags: [Users_groups]
 *      summary: Permet La modification d'un groupe
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Users_group'
 *    description: Grâce à l'id d'un groupe d'utilisateur vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: Users_group successfully updated
 *         
 */
router.patch('/update/:id', users_groupController.updateOneById)


/** 
 * @swagger
 * 
 * /users_groups/delete/{id}:
 *    delete:
 *      tags: [Users_groups]
 *      summary: Permet La suppressin d'un groupe
 *      description: Passer l'id du groupe d'utilisateur que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: Users_group successfully deleted
 *         
 */
router.delete('/delete/:id', users_groupController.deleteOneById)


/** 
 * @swagger
 * 
 * /users_groups/deleteAll:
 *    delete:
 *      tags: [Users_groups]
 *      summary: Permet La suppression de tous les groupes (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Users_groups successfully deleted
 *         
 */
router.delete('/deleteAll', users_groupController.deleteAll)

module.exports = router