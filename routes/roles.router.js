const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const roleController = require ("../controllers/roles-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Role:
 *          type: object
 *          required: 
 *              - role
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le rôle
 *             role:
 *               type: string
 *               description: Le nom du rôle                
 *             createdAt:
 *               type: date
 *               description: La date à laquelle le rôle a été créé
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification du rôle
 *          example: 
 *             id: 1
 *             role: Administrateur  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /roles:
 *    get:
 *      tags: [Roles]
 *      summary: Récupère la liste de tous les rôles
 *      description: Récupère la liste de tous les rôles
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Role'
 *         404:
 *            description: the roles table was not found
 */
router.get('/', roleController.getAll)

/** 
 * @swagger
 * 
 * /roles/{id}:
 *    get:
 *      tags: [Roles]
 *      summary: Récupère un rôle en fonction de son id
 *      description: Récupère un rôle en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Role'
 *         404:
 *            description: the roles table was not found
 */
router.get('/', roleController.getOneById)


/** 
 * @swagger
 * 
 * /roles/create:
 *    post:
 *      tags: [Roles]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Role'
 *      summary: Permet d'ajouter un nouveau rôle
 *      description: En fournissant un nom, vous pouvez créer un nouveau rôle.
 *      responses: 
 *         200:
 *            description: Role successfully created
 * 
 *         
 */
router.post('/create', roleController.createOne)


/** 
 * @swagger
 * 
 * /roles/update/{id}:
 *    patch:
 *      tags: [Roles]
 *      summary: Permet La modification d'un rôle
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Role'
 *    description: Grâce à l'id d'un rôle vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: Role successfully updated
 *         
 */
router.patch('/update/:id', roleController.updateOneById)


/** 
 * @swagger
 * 
 * /roles/delete/{id}:
 *    delete:
 *      tags: [Roles]
 *      summary: Permet La suppressin d'un rôle
 *      description: Passer l'id du rôle que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: Role successfully deleted
 *         
 */
router.delete('/delete/:id', roleController.deleteOneById)


/** 
 * @swagger
 * 
 * /roles/deleteAll:
 *    delete:
 *      tags: [Roles]
 *      summary: Permet La suppression de tous les rôles (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Roles successfully deleted
 *         
 */
router.delete('/deleteAll', roleController.deleteAll)

module.exports = router