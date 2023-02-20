const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const reportController = require ("../controllers/reports-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récupérer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Report:
 *          type: object
 *          required: 
 *              - report
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le report
 *             report_date:
 *               type: string
 *               description: La date de création du report                
 *          example: 
 *             id: 1
 *             report_date: "Absence injustifiée"  
 *
 * 
 */


/** 
 * @swagger
 * 
 * /report:
 *    get:
 *      tags: [Report]
 *      summary: Récupère la liste de tous les reports
 *      description: Récupère la liste de tous les reports
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Report'
 *         404:
 *            description: the reports table was not found
 */
router.get('/', reportController.getAll)

/** 
 * @swagger
 * 
 * /report/{id}:
 *    get:
 *      tags: [Report]
 *      summary: Récupère un report en fonction de son id
 *      description: Récupère un report en fonction de son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Report'
 *         404:
 *            description: the report table was not found
 */
router.get('/:id', reportController.getOneById)


/** 
 * @swagger
 * 
 * /report/create:
 *    post:
 *      tags: [Report]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Report'
 *      summary: Permet d'ajouter un nouveau report
 *      description: En fournissant un nom, vous pouvez créer un nouveau report.
 *      responses: 
 *         200:
 *            description: Report successfully created
 * 
 *         
 */
router.post('/create', reportController.createOne)


/** 
 * @swagger
 * 
 * /reports/update/{id}:
 *    patch:
 *      tags: [Reports]
 *      summary: Permet La modification d'un report
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Reports'
 *    description: Grâce à l'id d'un report vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: Reports successfully updated
 *         
 */
router.patch('/update/:id', reportController.updateOneById)


/** 
 * @swagger
 * 
 * /reports/delete/{id}:
 *    delete:
 *      tags: [Reports]
 *      summary: Permet La suppression d'un report
 *      description: Passer l'id du report que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: Reports successfully deleted
 *         
 */
router.delete('/delete/:id', reportController.deleteOneById) 


/** 
 * @swagger
 * 
 * /reports/deleteAll:
 *    delete:
 *      tags: [Reports]
 *      summary: Permet La suppression de tous les report (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Report successfully deleted
 *         
 */
router.delete('/deleteAll', reportController.deleteAll)

module.exports = router