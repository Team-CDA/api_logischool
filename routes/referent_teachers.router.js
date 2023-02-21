const { Router } = require ("express")
const referentTeachersController = require("../controllers/referent_teachers-controller")
const router = Router()

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Referent_teachers:
 *          type: object
 *          required: 
 *              - role
 *          properties: 
 *             referent_teacher:
 *               type: integer
 *               description: L'id qui représente le professeur réferent avec sa classe
 *          example: 
 *             id_class: 1
 *             id_user: 2
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 */

/** 
 * @swagger
 * 
 * /referent_teachers:     
 *    get:
 *      tags: [Professeur référent]
 *      summary: Récupère l'id de class et du professeur référent
 *      responses: 
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Referent_teachers'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/', referentTeachersController.getAll)

/** 
 * @swagger
 * 
 * /referent_teachers/{id}:
 *    get:
 *      tags: [Professeur référent]
 *      summary: Récupère l'id d'un professeur référent et l'id de sa classe
 *      description: Récupère l'id d'un professeur référent et l'id de sa classe
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Referent_teachers'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/:id', referentTeachersController.getOneById)

/** 
 * @swagger
 * 
 * /referent_teachers/create:
 *    post:
 *      tags: [Professeur référent]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Referent_teachers'
 *      summary: Permet d'ajouter un professeur et sa classe.
 *      description: Permet d'ajouter un professeur et sa classe.
 *      responses: 
 *         200:
 *            description: referent teacher successfully fetched
 */
router.post('/create', referentTeachersController.createOne)

/** 
 * @swagger
 * 
 * /referent_teachers/update/{id}:
 *    patch:
 *      tags: [Professeur référent]
 *      summary: Permet La modification d'un Professeur référent pour l'assigné à une classe
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Referent_teachers'
 *    description: Grâce à l'id d'un professeur référent vous pouvez la modifier.
 *    responses:
 *         200:
 *          description: alert type successfully updated
 *         
 */
router.patch('/update/:id', referentTeachersController.updateOneById)

/** 
 * @swagger
 * 
 * /referent_teachers/delete/{id}:
 *    delete:
 *      tags: [Professeur référent]
 *      summary: Permet la suppression d'un professeur référent
 *      description: Passer l'id du professeur référent que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: alert types successfully deleted
 *         
 */
router.delete('/delete/:id', referentTeachersController.deleteOneById)

module.exports = router