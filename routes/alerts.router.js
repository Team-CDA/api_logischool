const { Router } = require ("express")
const alertsController = require("../controllers/alerts-controller")
const router = Router()

/**
 * @swagger
 *  components: 
 *    schemas:
 *       Alerts:
 *          type: object
 *          required: 
 *              - alertes
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le type d'alerte
 *             message:
 *               type: string
 *               description: Le nom du type d'alerte               
 *             transmission_date:
 *               type: date
 *               description: La date à laquelle l'alerte a été créé
 *             id_alert_type:
 *              type: integer
 *              description: L'id qui représente l'alerte
 *             createdAt:
 *               type: date
 *               description: La date à laquelle l'alerte a été créé
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification de l'alerte
 *          example: 
 *             id: 1
 *             message: "Manifestation des enseignants"
 *             transmission_date: 2022-12-14T12:45:48 
 *             id_alert_type: 1 
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */

/** 
 * @swagger
 * 
 * /alerts:
 *    get:
 *      tags: [Alerts]
 *      summary: Récupère la liste des alertes
 *      description: Récupère la liste des alertes
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *                   application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                              $ref: '#/components/schemas/Alerts'
 *         404:
 *            description: the alerts table was not found
 * 
 */
router.get('/', alertsController.getAll)

/** 
 * @swagger
 * 
 * /alerts:
 *    get:
 *      tags: [Alerts]
 *      summary: Récupère une alerte par son id
 *      description: Récupère une alerte par son id
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/:id', alertsController.getOneById)

/** 
 * @swagger
 * 
 * /alerts/create:
 *    post:
 *      tags: [Alerts]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Alerts'
 *      summary: Permet d'ajouter une alerte
 *      description: Permet d'ajouter une alerte.
 *      responses: 
 *         200:
 *            description: alert successfully fetched
 */
router.post('/create', alertsController.createOne)


/** 
 * @swagger
 * 
 * /alerts/update/{id}:
 *    patch:
 *      tags: [Alerts]
 *      summary: Permet La modification d'une alerte
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Alerts'
 *    description: Grâce à l'id d'une alerte vous pouvez la modifier.
 *    responses:
 *         200:
 *          description: alert successfully updated
 *         
 */
router.patch('/update/:id', alertsController.updateOneById)

/** 
 * @swagger
 * 
 * /alerts/delete/{id}:
 *    delete:
 *      tags: [Alerts]
 *      summary: Permet La suppressin d'une alerte
 *      description: Passer l'id due alerte que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: alerts successfully deleted
 *         
 */
router.delete('/delete/:id', alertsController.deleteOneById)

module.exports = router