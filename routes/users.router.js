
const { Router } = require ("express")
const {getAllUsers} = require ("../controllers/users-controller")
const router = Router()


/** 
 * @swagger
 * 
 * /users:
 *    get:
 *      tags: [Utilisateurs]
 *      summary: Récupère la liste de tous les utilisateurs
 *      description: Récupère la liste de tous les utilisateurs
 *      responses: 
 *         200:
 *            description: Success
 * 
 */
router.get('/', getAllUsers)

module.exports = router