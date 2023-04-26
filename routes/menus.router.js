const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const menuController = require ("../controllers/menus-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récupérer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Menus:
 *          type: object
 *          required: 
 *              - menu
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le menu
 *             id_user:
 *               type: integer
 *               description: L'id qui représente l'utilisateur lié au menu'
 *             id_menu_type:
 *               type: integer
 *               description: L'id qui représente le type de menu'
 *             menu_date:
 *               type: string
 *               description: La date de création du menu                
 *          example: 
 *               id: 1
 *               id_user: 1
 *               id_menu_type: 1
 *               menu_date: "2023-05-21"  
 *
 * 
 */


/** 
 * @swagger
 * 
 * /menus:
 *    get:
 *      tags: [Menus]
 *      summary: Récupère la liste de tous les menus
 *      description: Récupère la liste de tous les menus
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Menus'
 *         404:
 *            description: the menus table was not found
 */
router.get('/', menuController.getAll)

/** 
 * @swagger
 * 
 * /menus/{id}:
 *    get:
 *      tags: [Menus]
 *      summary: Récupère un menu en fonction de son id
 *      description: Récupère un menu en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Menus'
 *         404:
 *            description: the menu table was not found
 */
router.get('/:id', menuController.getOneById)


/** 
 * @swagger
 * 
 * /menus/create:
 *    post:
 *      tags: [Menus]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Menus'
 *      summary: Permet d'ajouter un nouveau menu
 *      description: En fournissant un nom, vous pouvez créer un nouveau menu.
 *      responses: 
 *         200:
 *            description: Menu successfully created
 * 
 *         
 */
router.post('/', menuController.createOne)


/** 
 * @swagger
 * 
 * /menus/update/{id}:
 *    patch:
 *      tags: [Menus]
 *      summary: Permet La modification d'un menu
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Menus'
 *    description: Grâce à l'id d'un menu vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: Menus successfully updated
 *         
 */
router.patch('/update/:id', menuController.updateOneById)


/** 
 * @swagger
 * 
 * /menus/delete/{id}:
 *    delete:
 *      tags: [Menus]
 *      summary: Permet La suppression d'un menu
 *      description: Passer l'id du menu que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: Menus successfully deleted
 *         
 */
router.delete('/delete/:id', menuController.deleteOneById) 


/** 
 * @swagger
 * 
 * /menus/deleteAll:
 *    delete:
 *      tags: [Menus]
 *      summary: Permet La suppression de tous les menu (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Menu successfully deleted
 *         
 */
router.delete('/deleteAll', menuController.deleteAll)

module.exports = router