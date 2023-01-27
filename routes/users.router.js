
const { Router } = require ("express")
const userController = require("../controllers/users-controller")
const router = Router()

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Utilisateurs:
 *          type: object
 *          required: 
 *              - users
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le user
 *             firstname:
 *               type: string
 *               description: Le prénom de l'utilisateur
 *             lastname:
 *               type: string
 *               description: Le nom de l'utilisateur 
 *             birthdate:
 *               type: date
 *               description: la date de naissance                    
 *             createdAt:
 *               type: date
 *               description: La date à laquelle le rôle a été créé
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification du rôle
 *          example: 
 *             id: 1
 *             firstname: Nicolas
 *             lastname: Personne
 *             birthdate: 24/05/1991
 *             adress: 70 rue des Jacobins
 *             city: Amiens
 *             zipcode: "80000"
 *             mail: nicolasp@lamanus.jp
 *             phone: "0102030405"
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 */

/** 
 * @swagger
 * 
 * /users:     
 *    get:
 *      tags: [Utilisateurs]
 *      summary: Récupère la liste de tous les utilisateurs
 *      responses: 
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Utilisateurs'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/', userController.getAllUsers)

/** 
 * @swagger
 * 
 * /users/{id}:
 *    get:
 *      tags: [Utilisateurs]
 *      summary: Récupère un utilisateurs par son id
 *      description: Récupère un utilisateurs par son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Utilisateurs'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/:id', userController.getOneById)

/** 
 * @swagger
 * 
 * /users/create:
 *    post:
 *      tags: [Utilisateurs]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Utilisateurs'
 *      summary: Permet d'ajouter un nouveau utilisateur
 *      description: En Remplissant le formulaire, vous pouvez créer un nouveau utilisateur.
 *      responses: 
 *         200:
 *            description: Role successfully created
 * 
 *         
 */
router.post('/create', userController.createOne)


/** 
 * @swagger
 * 
 * /users/update/{id}:
 *    patch:
 *      tags: [Utilisateurs]
 *      summary: Permet la modification d'un utilisateur
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Utilisateurs'
 *    description: Grâce à l'id d'un utilisateur vous pouvez modifier certaine information.
 *    responses:
 *         200:
 *          description: Role successfully updated
 *         
 */
router.patch('/update/:id', userController.updateOneById)


/** 
 * @swagger
 * 
 * /users/delete/{id}:
 *    delete:
 *      tags: [Utilisateurs]
 *      summary: Permet la suppression d'un utilisateur
 *      description: Passer l'id du rôle que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: user successfully deleted
 *         
 */
router.delete('/delete/:id', userController.deleteOneById)


// /** 
//  * @swagger
//  * 
//  * /roles/deleteAll:
//  *    delete:
//  *      tags: [Roles]
//  *      summary: Permet La suppression de tous les rôles (truncate)
//  *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
//  *      responses:
//  *         200:
//  *          description: Roles successfully deleted
//  *         
//  */
// router.delete('/deleteAll', roleController.deleteAll)

module.exports = router