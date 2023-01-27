
const { Router } = require ("express")
const userController = require("../controllers/users-controller")
const router = Router()


/** 
 * @swagger
 * 
 * /users:
 *    get:
 *      tags: [Utilisateurs]
 *      summary: Récupère la liste de tous les utilisateurs
 *      description: Récupère la liste de tous les utilisateurs
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/', userController.getAllUsers)

/** 
 * @swagger
 * 
 * /users:
 *    get:
 *      tags: [Utilisateurs]
 *      summary: Récupère un utilisateurs par son id
 *      description: Récupère un utilisateurs par son id
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/:id', userController.getOneById)

/** 
 * @swagger
 * 
 * /users/create:
 *    post:
 *      tags: [Utilisateur]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Users'
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
 *      tags: [Utilisateur]
 *      summary: Permet La modification d'un utilisateur
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Users'
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
 *      summary: Permet La suppressin d'un utilisateur
 *      description: Passer l'id du rôle que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: user successfully deleted
 *         
 */
router.delete('/delete/:id', userController.deleteOneById)

module.exports = router