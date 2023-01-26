const { Router } = require ("express")
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
 *             classe: Administrateur  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /classes:
 *    get:
 *      tags: [Classes]
 *      summary: Récupère la liste de tous les classes
 *      description: Récupère la liste de tous les classes
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Classe'
 *         404:
 *            description: the classes table was not found
 */
router.get('/', classeController.getAll)

/** 
 * @swagger
 * 
 * /classes/{id}:
 *    get:
 *      tags: [Classes]
 *      summary: Récupère une classe en fonction de son id
 *      description: Récupère une classe en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Classe'
 *         404:
 *            description: the classes table was not found
 */
router.get('/:id', classeController.getOneById)


/** 
 * @swagger
 * 
 * /classes/create:
 *    post:
 *      tags: [Classes]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Classe'
 *      summary: Permet d'ajouter une nouvelle classe
 *      description: En fournissant un nom, vous pouvez créer une nouvelle classe.
 *      responses: 
 *         200:
 *            description: Classe successfully created
 * 
 *         
 */
router.post('/create', classeController.createOne)


/** 
 * @swagger
 * 
 * /classes/update/{id}:
 *    patch:
 *      tags: [Classes]
 *      summary: Permet La modification d'une classe
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Classe'
 *    description: Grâce à l'id d'une classe vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: Classe successfully updated
 *         
 */
router.patch('/update/:id', classeController.updateOneById)


/** 
 * @swagger
 * 
 * /classes/delete/{id}:
 *    delete:
 *      tags: [Classes]
 *      summary: Permet La suppression d'une classe
 *      description: Passer l'id du classe que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: Classe successfully deleted
 *         
 */
router.delete('/delete/:id', classeController.deleteOneById)


/** 
 * @swagger
 * 
 * /classes/deleteAll:
 *    delete:
 *      tags: [Classes]
 *      summary: Permet La suppression de toutes les classes (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Classes successfully deleted
 *         
 */
router.delete('/deleteAll', classeController.deleteAll)

module.exports = router