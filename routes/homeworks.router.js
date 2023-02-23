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
 *      tags: [Homeworks]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Homeworks'
 *      summary: Allows you to create a new homework
 *      description: When you pass a homework name in the body, you create a homework with this name
 *      responses: 
 *         200:
 *            description: alert types successfully created
 */
router.post('/', multer, homeworksController.updateOrCreate)

