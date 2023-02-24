const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const users_classController = require ("../controllers/users_classes-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Users_class:
 *          type: object
 *          required: 
 *              - users_class
 *          properties: 
 *             id_user:
 *               type: integer
 *               description: L'id de l'utilisateur                
 *             id_class:
 *               type: integer
 *               description: L'id de la classe
 *             createdAt:
 *               type: integer
 *               description: La date de création de l'association
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
 * /users_classes:
 *    get:
 *      tags: [Users_classes]
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
 *            description: the Users_classes table was not found
 */
router.get('/', users_classController.getAll)

/** 
 * @swagger
 * 
 * /users_classes/{id}:
 *    get:
 *      tags: [Users_classes]
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
 *            description: the Users_classes table was not found
 */
router.get('/:id', users_classController.getOneById)


/** 
 * @swagger
 * 
 * /users_classes/create:
 *    post:
 *      tags: [Users_classes]
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
 *            description: Users_class successfully created
 * 
 *         
 */
router.post('/create', users_classController.createOne)


/** 
 * @swagger
 * 
 * /users_classes/update/{id}:
 *    patch:
 *      tags: [Users_classes]
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
 *          description: Users_class successfully updated
 *         
 */
router.patch('/update/:id', users_classController.updateOneById)


/** 
 * @swagger
 * 
 * /users_classes/delete/{id}:
 *    delete:
 *      tags: [Users_groups]
 *      summary: Permet La suppression d'un groupe
 *      description: Passer l'id du groupe d'utilisateur que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: Users_class successfully deleted
 *         
 */
router.delete('/delete/:id', users_classController.deleteOneById)


/** 
 * @swagger
 * 
 * /users_classes/deleteAll:
 *    delete:
 *      tags: [Users_classes]
 *      summary: Permet La suppression de tous les groupes (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Users_classes successfully deleted
 *         
 */
router.delete('/deleteAll', users_classController.deleteAll)

module.exports = router