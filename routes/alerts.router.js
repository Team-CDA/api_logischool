const { Router } = require("express");
const alertsControllerFactory = require("../controllers/alerts-controller");
const router = Router();

module.exports = (io) => {
  const alertsController = alertsControllerFactory(io);

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
   *               description: The id of the alert
   *             message:
   *               type: string
   *               description: The message of the alert
   *             transmission_date:
   *               type: date
   *               description: The date of the alert transmission
   *             id_alert_type:
   *              type: integer
   *              description: The id of the alert type
   *             createdAt:
   *               type: date
   *               description: The date of the creation of the alert
   *             updatedAt:
   *               type: date
   *               description: The date of the update of the alert
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
   *      summary: Retrieve the list of alerts
   *      description: Retrieve the list of alerts
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
  router.get("/", alertsController.getAll);

  /**
   * @swagger
   *
   * /alerts/user/{id}:
   *   get:
   *     tags: [Alerts]
   *     summary: Retrieve the list of alerts for one user
   *     description: Retrieve the list of alerts for one user
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID of the user to retrieve alerts for
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Alerts'
   *       404:
   *         description: The alerts table was not found
   */
  router.get("/user/:id", alertsController.getAllForOneUser);

  /**
   * @swagger
   *
   * /alerts:
   *    get:
   *      tags: [Alerts]
   *      summary: Retrieve an alert by its ID
   *      description: Retrieve an alert by its ID
   *      responses:
   *         200:
   *            description: Success
   *
   */
  router.get("/:id", alertsController.getOneById);

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
   *      summary: Allow adding an alert
   *      description: Allow adding an alert.
   *      responses:
   *         200:
   *            description: alert successfully fetched
   */
  router.post("/create", alertsController.createOne);

  /**
   * @swagger
   *
   * /alerts/update/{id}:
   *    patch:
   *      tags: [Alerts]
   *      summary: Allow modifying of an alert
   *      requestBody:
   *       required: true
   *       content:
   *         application/json:
   *            schema:
   *               $ref: '#/components/schemas/Alerts'
   *    description: You can modify an alert by its ID.
   *    responses:
   *         200:
   *          description: alert successfully updated
   *
   */
  router.patch("/update/:id", alertsController.updateOneById);

  /**
   * @swagger
   *
   * /alerts/delete/{id}:
   *    delete:
   *      tags: [Alerts]
   *      summary: Allow deleting an alert
   *      description: Pass the ID of the role you wish to delete in the URL and it's done.
   *      responses:
   *         200:
   *          description: alerts successfully deleted
   *
   */
  router.delete("/delete/:id", alertsController.deleteOneById);

  return router;
};
