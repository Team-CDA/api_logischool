const { Router } = require ("express")
const alertTypesController = require("../controllers/alert_types-controller")
const router = Router()

/** 
 * @swagger
 * 
 * /alert_types:
 *    get:
 *      tags: [types d'alerte]
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
 *      tags: [types d'alerte]
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
 *      tags: [types d'alerte]
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
 *      tags: [type d'alerte]
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
 *      tags: [type d'alerte]
 *      summary: Permet La suppressin d'un type d'alerte
 *      description: Passer l'id du type d'alerte que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: alert types successfully deleted
 *         
 */
router.delete('/delete/:id', alertTypesController.deleteOneById)

module.exports = router