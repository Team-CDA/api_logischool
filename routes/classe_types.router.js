const { Router } = require ("express")
const classTypesController = require("../controllers/classe_types-controller")
const router = Router()

/** 
 * @swagger
 * 
 * /class_types:
 *    get:
 *      tags: [types de classe]
 *      summary: Récupère la liste de type de classe
 *      description: Récupère la liste de type de classe
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/', classTypesController.getAll)

/** 
 * @swagger
 * 
 * /class_types:
 *    get:
 *      tags: [types de classe]
 *      summary: Récupère un type de classe par son id
 *      description: Récupère un type de classe par son id
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/:id', classTypesController.getOneById)

/** 
 * @swagger
 * 
 * /class_types/create:
 *    post:
 *      tags: [type de classe]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/class_types'
 *      summary: Permet d'ajouter un type de classe
 *      description: Permet d'ajouter un type de classe.
 *      responses: 
 *         200:
 *            description: classe_types successfully created
 */
router.post('/create', classTypesController.createOne)


/** 
 * @swagger
 * 
 * /class_types/update/{id}:
 *    patch:
 *      tags: [type de class]
 *      summary: Permet La modification d'un type de classe
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/class_types'
 *    description: Grâce à l'id d'un type de classe vous pouvez la modifier.
 *    responses:
 *         200:
 *          description: class_types successfully updated
 *         
 */
router.patch('/update/:id', classTypesController.updateOneById)

/** 
 * @swagger
 * 
 * /class_types/delete/{id}:
 *    delete:
 *      tags: [type de class]
 *      summary: Permet La suppression d'un type de classe
 *      description: Passer l'id de la classe que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: class_types successfully deleted
 *         
 */
router.delete('/delete/:id', classTypesController.deleteOneById)

module.exports = router