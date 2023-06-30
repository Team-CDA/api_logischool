const { Router } = require ("express")
const users_subjectsController = require("../controllers/users_subjects-controller")
const router = Router()

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Users_subjects:
 *          type: object
 *          required: 
 *              - users_subjects
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente l'utilisateur lié à une matière             
 *             id_user:
 *               type: integer
 *               description: L'id de l'utilisateur
 *             id_subject:
 *               type: integer
 *               description: L'id de la matière
 *          example: 
 *             id: 1
 *             id_user: 2
 *             id_subject: 1
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /users_subjects:     
 *    get:
 *      tags: [Users_subjects]
 *      summary: Récupère la liste d'id de tous les utilisatuers lié à une matière
 *      responses: 
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Users_subjects'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/', users_subjectsController.getAll)

/** 
 * @swagger
 * 
 * /users_subjects/{id}:
 *    get:
 *      tags: [Users_subjects]
 *      summary: Récupère un utilisateur lié à une matière par son id
 *      description: Récupère un utilisateur lié à une matière par son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Users_subjects'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/:id', users_subjectsController.getOneById)

router.get('/user/:id', users_subjectsController.getOneByUserId)

/** 
 * @swagger
 * 
 * /users_subjects/create:
 *    post:
 *      tags: [Users_subjects]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Users_subjects'
 *      summary: Permet d'ajouter un utilisateur lié à une matière dans la database avec un id user et subject
 *      responses: 
 *         200:
 *            description: users subjects successfully created
 * 
 *         
 */
router.post('/create', users_subjectsController.createOne)


/** 
 * @swagger
 * 
 * /users_subjects/update/{id}:
 *    patch:
 *      tags: [Users_subjects]
 *      summary: Permet la modification d'un utilisateur lié à une matière
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Users_subjects'
 *    description: Grâce à l'id d'un utilisateur vous pouvez modifier certaine information.
 *    responses:
 *         200:
 *          description: users subjects successfully updated
 *         
 */
router.patch('/update/:id', users_subjectsController.updateOneById)


/** 
 * @swagger
 * 
 * /users_subjects/delete/{id}:
 *    delete:
 *      tags: [Users_subjects]
 *      summary: Permet la suppression d'un utilisateur
 *      description: Passer l'id de l'utilisateur lié à une matière que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: users subjects successfully deleted
 *         
 */
router.delete('/delete/:id', users_subjectsController.deleteOneById)

module.exports = router