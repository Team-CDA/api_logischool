const { Router } = require ("express")
const subjectsController = require("../controllers/subjects-controller")
const router = Router()

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Subjects:
 *          type: object
 *          required: 
 *              - subjects
 *          properties: 
 *             subjects:
 *               type: string
 *               description: Récupère les matières avec l'id
 *          example: 
 *             id: 1
 *             subject_name: "Sport"
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 */

/** 
 * @swagger
 * 
 * /subjects:     
 *    get:
 *      tags: [Subject]
 *      summary: Récupère les matières
 *      responses: 
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Subjects'
 *         404:
 *            description: the table was not found
 */
router.get('/', subjectsController.getAll)

/** 
 * @swagger
 * 
 * /subjects/{id}:
 *    get:
 *      tags: [Subject]
 *      summary: Récupère une matière par son id
 *      description: Récupère une matière par son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Subjects'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/:id', subjectsController.getOneById)

/** 
 * @swagger
 * 
 * /subjects/create:
 *    post:
 *      tags: [Subject]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Subjects'
 *      summary: Permet d'ajouter un nouveau utilisateur
 *      description: En Remplissant le formulaire, vous pouvez créer un nouveau utilisateur.
 *      responses: 
 *         200:
 *            description: Role successfully created
 * 
 *         
 */
router.post('/create', subjectsController.createOne)

/** 
 * @swagger
 * 
 * /subjects/update/{id}:
 *    patch:
 *      tags: [Subject]
 *      summary: Permet La modification d'une matière
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Subjects'
 *    description: Grâce à l'id d'une matière vous pouvez la modifier.
 *    responses:
 *         200:
 *          description: alert type successfully updated
 *         
 */
router.patch('/update/:id', subjectsController.updateOneById)

/** 
 * @swagger
 * 
 * /subjects/delete/{id}:
 *    delete:
 *      tags: [Subject]
 *      summary: Permet la suppressin d'une matière
 *      description: Passer l'id d'une matière que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: subject successfully deleted
 *         
 */
router.delete('/delete/:id', subjectsController.deleteOneById)

module.exports = router