const { Router } = require ("express")
const classTypesController = require("../controllers/classe_types-controller")
const router = Router()

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Types de classe:
 *          type: object
 *          required: 
 *              - class_type
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le type de classe
 *             class_type:
 *               type: string
 *               description: Le nom du type de classe               
 *             createdAt:
 *               type: date
 *               description: La date à laquelle le type de classe a été créé
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification du type de classe
 *          example: 
 *             id: 1
 *             class_type: "Primaire"  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /class_types:
 *    get:
 *      tags: [Types de classe]
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
 *      tags: [Types de classe]
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
 *      tags: [Types de classe]
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
 *      tags: [Types de classe]
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
 *      tags: [Types de classe]
 *      summary: Permet La suppression d'un type de classe
 *      description: Passer l'id de la classe que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: class_types successfully deleted
 *         
 */
router.delete('/delete/:id', classTypesController.deleteOneById)

module.exports = router