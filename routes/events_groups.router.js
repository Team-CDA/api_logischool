const { Router } = require ("express")
const events_groupsController = require("../controllers/events_groups-controller")
const router = Router()

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Events_groups:
 *          type: object
 *          required: 
 *              - events_groups
 *          properties: 
 *             events_groups:
 *               type: string
 *               description: L'id qui représente le groupe pour l'événement de groupe
 *          example: 
 *             id: 1
 *             id_event: "1"
 *             id_group: "1"
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 */

/** 
 * @swagger
 * 
 * /events_groups:     
 *    get:
 *      tags: [Events Groups]
 *      summary: Récupère les id d'évent et groupe
 *      responses: 
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Events_groups'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/', events_groupsController.getAll)

/** 
 * @swagger
 * 
 * /events_groups/{id}:
 *    get:
 *      tags: [Events Groups]
 *      summary: Récupère un évent de groupe par son id
 *      description: Récupère un évent de groupe par son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Events_groups'
 *         404:
 *            description: the table was not found
 */
router.get('/:id', events_groupsController.getOneById)

/** 
 * @swagger
 * 
 * /events_groups/create:
 *    post:
 *      tags: [Events Groups]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Events_groups'
 *      summary: Permet d'ajouter un évent de groupe.
 *      description: Permet d'ajouter un évent de groupe.
 *      responses: 
 *         200:
 *            description: events groups successfully fetched
 */
router.post('/create', events_groupsController.createOne)

/** 
 * @swagger
 * 
 * /events_groups/update/{id}:
 *    patch:
 *      tags: [Events Groups]
 *      summary: Permet La modification d'un évent de groupe
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Events_groups'
 *    description: Grâce à l'id d'un évent de groupe vous pouvez la modifier.
 *    responses:
 *         200:
 *          description: events groups successfully updated
 *         
 */
router.patch('/update/:id', events_groupsController.updateOneById)

/** 
 * @swagger
 * 
 * /events_groups/delete/{id}:
 *    delete:
 *      tags: [Events Groups]
 *      summary: Permet la suppresion d'un évent de groupe
 *      description: Passer l'id de l'évent de groupe que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: alert types successfully deleted
 *         
 */
router.delete('/delete/:id', events_groupsController.deleteOneById)

module.exports = router