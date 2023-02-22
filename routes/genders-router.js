
const { Router } = require ("express")
const gendersController = require("../controllers/genders-controller")
const router = Router()

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Genders:
 *          type: object
 *          required: 
 *              - role
 *          properties: 
 *             gender:
 *               type: string
 *               description: L'id qui représente le genre
 *          example: 
 *             id: 1
 *             gender: "Homme"
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 */

/** 
 * @swagger
 * 
 * /genders:     
 *    get:
 *      tags: [Genre]
 *      summary: Récupère les genres utilisateurs
 *      responses: 
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Genders'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/', gendersController.getGenderAll)

/** 
 * @swagger
 * 
 * /genders/{id}:
 *    get:
 *      tags: [Genre]
 *      summary: Récupère un genre par son id
 *      description: Récupère un genre par son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Genders'
 *         404:
 *            description: the table was not found
 */
router.get('/:id', gendersController.getOneById)

/** 
 * @swagger
 * 
 * /genders/create:
 *    post:
 *      tags: [Genre]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Genders'
 *      summary: Permet d'ajouter un genre.
 *      description: Permet d'ajouter un genre.
 *      responses: 
 *         200:
 *            description: genders successfully fetched
 */
router.post('/create', gendersController.createOne)

/** 
 * @swagger
 * 
 * /genders/update/{id}:
 *    patch:
 *      tags: [Genre]
 *      summary: Permet La modification d'un genre
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Genders'
 *    description: Grâce à l'id d'un genre vous pouvez la modifier.
 *    responses:
 *         200:
 *          description: alert type successfully updated
 *         
 */
router.patch('/update/:id', gendersController.updateOneById)

/** 
 * @swagger
 * 
 * /genders/delete/{id}:
 *    delete:
 *      tags: [Genre]
 *      summary: Permet la suppressin d'un genre
 *      description: Passer l'id du genre que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: alert types successfully deleted
 *         
 */
router.delete('/delete/:id', gendersController.deleteOneById)

module.exports = router