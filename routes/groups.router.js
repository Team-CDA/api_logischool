const { Router } = require ("express")
const router = Router()
//On importe le controller avec toutes les méthodes à l'intérieur.
const groupController = require ("../controllers/groups-controller")



//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Group:
 *          type: object
 *          required: 
 *              - group
 *          properties: 
 *             id:
 *               type: integer
 *               description: The auto-generated id of the group
 *             group:
 *               type: string
 *               description: Group name             
 *             createdAt:
 *               type: date
 *               description: Date of creation of the group
 *             updatedAt:
 *               type: date
 *               description: Date of the last modification of the group
 *          example: 
 *             id: 1
 *             group: "Administrateur"  
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /groups:
 *    get:
 *      tags: [Groups]
 *      summary: Retrieves the list of all groups
 *      description: Retrieves the list of all groups
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Group'
 *         404:
 *            description: the groups table was not found
 */
router.get('/', groupController.getAll)

/** 
 * @swagger
 * 
 * /groups/{id}:
 *    get:
 *      tags: [Groups]
 *      summary: Retrieves the group corresponding to the id passed in the url
 *      description: When you pass an id in the url, you get the group corresponding to this id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Group'
 *         404:
 *            description: the groups table was not found
 */
router.get('/:id', groupController.getOneById)


/** 
 * @swagger
 * 
 * /groups/create:
 *    post:
 *      tags: [Groups]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Group'
 *      summary: Allows you to create a group
 *      description: When you pass a group name in the body, you create a group with this name
 *      responses: 
 *         200:
 *            description: Group successfully created
 * 
 *         
 */
router.post('/create', groupController.createOne)


/** 
 * @swagger
 * 
 * /groups/update/{id}:
 *    patch:
 *      tags: [Groups]
 *      summary: Allows you to update a group
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Group'
 *    description: Pass the id of the group you want to update in the url and the new name in the body
 *    responses:
 *         200:
 *          description: Group successfully updated
 *         
 */
router.patch('/update/:id', groupController.updateOneById)


/** 
 * @swagger
 * 
 * /groups/delete/{id}:
 *    delete:
 *      tags: [Groups]
 *      summary: Allows you to delete a group
 *      description: Pass the id of the group you want to delete in the url
 *      responses:
 *         200:
 *          description: Group successfully deleted
 *         
 */
router.delete('/delete/:id', groupController.deleteOneById)


/** 
 * @swagger
 * 
 * /groups/deleteAll:
 *    delete:
 *      tags: [Groups]
 *      summary: Allows you to delete all groups
 *      description: Delete all groups
 *      responses:
 *         200:
 *          description: Groups successfully deleted
 *         
 */
router.delete('/deleteAll', groupController.deleteAll)

module.exports = router