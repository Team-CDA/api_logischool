const { Router } = require ("express")
const classTypesController = require("../controllers/class_types-controller")
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
 *      tags: [types d'class]
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
 *      tags: [types de class]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/class_types'
 *      summary: Permet d'ajouter un type d'class
 *      description: Permet d'ajouter un type de class.
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
 *      summary: Permet La modification d'un type de class
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/class_types'
 *    description: Grâce à l'id d'un type de class vous pouvez la modifier.
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
 *      summary: Permet La suppressin d'un type de class
 *      description: Passer l'id du rôle que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: class_types successfully deleted
 *         
 */
router.delete('/delete/:id', classTypesController.deleteOneById)


// /** 
//  * @swagger
//  * 
//  * /class_types/deleteAll:
//  *    delete:
//  *      tags: [types de class]
//  *      summary: Permet La suppression de tous les type de class (truncate)
//  *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
//  *      responses:
//  *         200:
//  *          description: class_types successfully deleted
//  *         
//  */
// router.delete('/deleteAll', classTypesController.deleteAll)

module.exports = router