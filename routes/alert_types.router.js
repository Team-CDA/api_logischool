const { Router } = require ("express")
const alertTypesController = require("../controllers/alert_types-controller")
const router = Router()

/**
 * @swagger
 *  components: 
 *    schemas:
 *       Types d'alerte:
 *          type: object
 *          required: 
 *              - alert_type
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le type d'alerte
 *             type:
 *               type: string
 *               description: Le nom du type d'alerte               
 *             createdAt:
 *               type: date
 *               description: La date à laquelle le type d'alerte a été créé
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification du type d'alerte
 *          example: 
 *             id: 1
 *             class_type: Manifestation  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */

/** 
 * @swagger
 * 
 * /alert_types:
 *    get:
 *      tags: [Types d'alerte]
 *      summary: Récupère la liste des types d'alerte
 *      description: Récupère la liste de types d'alertes
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/', alertTypesController.getAll)

/** 
 * @swagger
 * 
 * /alert_types:
 *    get:
 *      tags: [Types d'alerte]
 *      summary: Récupère un type d'alerte par son id
 *      description: Récupère un type d'alerte par son id
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/:id', alertTypesController.getOneById)

/** 
 * @swagger
 * 
 * /alert_types/create:
 *    post:
 *      tags: [Types d'alerte]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/alert_types'
 *      summary: Permet d'ajouter un type d'alerte
 *      description: Permet d'ajouter un type d'alerte.
 *      responses: 
 *         200:
 *            description: alert type successfully fetched
 */
router.post('/create', alertTypesController.createOne)


/** 
 * @swagger
 * 
 * /alert_types/update/{id}:
 *    patch:
 *      tags: [Types d'alerte]
 *      summary: Permet La modification d'un type d'alerte
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/alert_types'
 *    description: Grâce à l'id d'un type d'alerte vous pouvez la modifier.
 *    responses:
 *         200:
 *          description: alert type successfully updated
 *         
 */
router.patch('/update/:id', alertTypesController.updateOneById)

/** 
 * @swagger
 * 
 * /alert_types/delete/{id}:
 *    delete:
 *      tags: [Types d'alerte]
 *      summary: Permet La suppressin d'un type d'alerte
 *      description: Passer l'id du type d'alerte que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: alert types successfully deleted
 *         
 */
router.delete('/delete/:id', alertTypesController.deleteOneById)

module.exports = router