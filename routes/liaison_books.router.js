const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const liaison_bookController = require ("../controllers/liaison_books-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récupérer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       liaison_books:
 *          type: object
 *          required: 
 *              - liaison_book
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le liaison_book
 *             id_user:
 *               type: integer
 *               description: L'id qui représente l'utilisateur lié au liaison_book'
 *             id_liaison_book_type:
 *               type: integer
 *               description: L'id qui représente le type de liaison_book'
 *             liaison_book_date:
 *               type: string
 *               description: La date de création du liaison_book                
 *          example: 
 *               id: 1
 *               id_user: 1
 *               id_liaison_book_type: 1
 *               liaison_book_date: "2023-05-21"  
 *
 * 
 */


/** 
 * @swagger
 * 
 * /liaison_books:
 *    get:
 *      tags: [liaison_books]
 *      summary: Récupère la liste de tous les liaison_books
 *      description: Récupère la liste de tous les liaison_books
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/liaison_books'
 *         404:
 *            description: the liaison_books table was not found
 */
router.get('/', liaison_bookController.getAll)

/** 
 * @swagger
 * 
 * /liaison_books/{id}:
 *    get:
 *      tags: [liaison_books]
 *      summary: Récupère un liaison_book en fonction de son id
 *      description: Récupère un liaison_book en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/liaison_books'
 *         404:
 *            description: the liaison_book table was not found
 */
router.get('/:id', liaison_bookController.getOneById)


/** 
 * @swagger
 * 
 * /liaison_books/create:
 *    post:
 *      tags: [liaison_books]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/liaison_books'
 *      summary: Permet d'ajouter un nouveau liaison_book
 *      description: En fournissant un nom, vous pouvez créer un nouveau liaison_book.
 *      responses: 
 *         200:
 *            description: liaison_book successfully created
 * 
 *         
 */
router.post('/', liaison_bookController.createOne)


/** 
 * @swagger
 * 
 * /liaison_books/update/{id}:
 *    patch:
 *      tags: [liaison_books]
 *      summary: Permet La modification d'un liaison_book
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/liaison_books'
 *    description: Grâce à l'id d'un liaison_book vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: liaison_books successfully updated
 *         
 */
router.put('/update/:id', liaison_bookController.updateOneById)


/** 
 * @swagger
 * 
 * /liaison_books/delete/{id}:
 *    delete:
 *      tags: [liaison_books]
 *      summary: Permet La suppression d'un liaison_book
 *      description: Passer l'id du liaison_book que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: liaison_books successfully deleted
 *         
 */
router.delete('/delete/:id', liaison_bookController.deleteOneById) 


/** 
 * @swagger
 * 
 * /liaison_books/deleteAll:
 *    delete:
 *      tags: [liaison_books]
 *      summary: Permet La suppression de tous les liaison_book (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: liaison_book successfully deleted
 *         
 */
router.delete('/deleteAll', liaison_bookController.deleteAll)

module.exports = router