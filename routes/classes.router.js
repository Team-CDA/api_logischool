const { Router } = require ("express")
const ClassesController = require("../controllers/Classes-controller")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const classeController = require ("../controllers/classes-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Classe:
 *          type: object
 *          required: 
 *              - classe
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente la classe
 *             classe:
 *               type: string
 *               description: Le nom de la classe                
 *             createdAt:
 *               type: date
 *               description: La date à laquelle la classe a été créé
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification du classe
 *          example: 
 *             id: 1
 *             classe: "CM2"  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /Classes:
 *    get:
 *      tags: [Classes]
 *      summary: Récupère la liste de toutes les Classes
 *      description: Récupère la liste de toutes les Classes
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/', ClassesController.getAll)

/** 
 * @swagger
 * 
 * /Classes:
 *    get:
 *      tags: [Classes]
 *      summary: Récupère une Classe par son id
 *      description: Récupère une Classe par son id
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/:id', ClassesController.getOneById)

/** 
 * @swagger
 * 
 * /Classes/create:
 *    post:
 *      tags: [Classes]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Classe'
 *      summary: Permet d'ajouter une Classe
 *      description: Permet d'ajouter une Classe.
 *      responses: 
 *         200:
 *            description: Classe successfully created
 */
router.post('/create', ClassesController.createOne)


/** 
 * @swagger
 * 
 * /Classes/update/{id}:
 *    patch:
 *      tags: [Classes]
 *      summary: Permet La modification d'une Classe
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Classe'
 *    description: Grâce à l'id d'une Classe vous pouvez la modifier.
 *    responses:
 *         200:
 *          description: alert types successfully updated
 *         
 */
router.patch('/update/:id', ClassesController.updateOneById)

/** 
 * @swagger
 * 
 * /Classes/delete/{id}:
 *    delete:
 *      tags: [Classes]
 *      summary: Permet La suppressin d'une Classe
 *      description: Passer l'id de la Classe que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: class successfully deleted
 *         
 */
router.delete('/delete/:id', ClassesController.deleteOneById)


/** 
 * @swagger
 * 
 * /Classes/deleteAll:
 *    delete:
 *      tags: [Classes]
 *      summary: Permet La suppression de toutes les Classes (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Classes successfully deleted
 *         
 */
router.delete('/deleteAll', ClassesController.deleteAll)

module.exports = router