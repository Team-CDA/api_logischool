const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const report_typeController = require ("../controllers/report_types-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récupérer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Report_types:
 *          type: object
 *          required: 
 *              - report_type
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le type de report
 *             report_name:
 *               type: string
 *               description: Le nom du type d'report                
 *          example: 
 *             id: 1
 *             name: "Absence injustifiée"  
 *
 * 
 */


/** 
 * @swagger
 * 
 * /report_types:
 *    get:
 *      tags: [Report_types]
 *      summary: Récupère la liste de tous les types de reports
 *      description: Récupère la liste de tous les types de reports
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Report_types'
 *         404:
 *            description: the reports table was not found
 */
router.get('/', report_typeController.getAll)

/** 
 * @swagger
 * 
 * /report_types/{id}:
 *    get:
 *      tags: [Report_types]
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
 *                    $ref: '#/components/schemas/Report_types'
 *         404:
 *            description: the report_types table was not found
 */
router.get('/:id', report_typeController.getOneById)


/** 
 * @swagger
 * 
 * /report_types/create:
 *    post:
 *      tags: [Report_types]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Report_types'
 *      summary: Permet d'ajouter un nouveau type d'report
 *      description: En fournissant un nom, vous pouvez créer un nouveau type d'report.
 *      responses: 
 *         200:
 *            description: Report_types successfully created
 * 
 *         
 */
router.post('/create', report_typeController.createOne)


/** 
 * @swagger
 * 
 * /report_types/update/{id}:
 *    patch:
 *      tags: [Report_types]
 *      summary: Permet La modification d'un type d'report
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Report_types'
 *    description: Grâce à l'id d'un type d'report vous pouvez changer le nom correspondant.
 *    responses:
 *         200:
 *          description: Report_types successfully updated
 *         
 */
router.patch('/update/:id', report_typeController.updateOneById)


/** 
 * @swagger
 * 
 * /report_types/delete/{id}:
 *    delete:
 *      tags: [Report_types]
 *      summary: Permet La suppression d'un type d'report
 *      description: Passer l'id du type d'report que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: Report_types successfully deleted
 *         
 */
router.delete('/delete/:id', report_typeController.deleteOneById) 


/** 
 * @swagger
 * 
 * /report_types/deleteAll:
 *    delete:
 *      tags: [Report_types]
 *      summary: Permet La suppression de tous les type d'report (truncate)
 *      description: Supprime la table en faisant un truncate, donc les ID repartent à 1
 *      responses:
 *         200:
 *          description: Report_type successfully deleted
 *         
 */
router.delete('/deleteAll', report_typeController.deleteAll)

module.exports = router