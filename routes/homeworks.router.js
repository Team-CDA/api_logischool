const { Router } = require ("express")
const router = Router()
const homeworksController = require ("../controllers/homeworks-controller")
const multer = require('../helpers/multer-config')

module.exports = router



/** 
 * @swagger
 * 
 * /homeworks/create:
 *    post:
 *      tags: [types d'alerte]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/homeworks'
 *      summary: Permet d'ajouter un type d'alerte
 *      description: Permet d'ajouter un type d'alerte.
 *      responses: 
 *         200:
 *            description: alert types successfully created
 */
router.post('/', multer, homeworksController.updateOrCreate)

