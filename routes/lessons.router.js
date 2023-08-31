const { Router } = require('express');
const lessonsController = require('../controllers/lessons-controller');
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       required:
 *         - lesson_datetime
 *         - id_room
 *         - id_user
 *         - id_subject
 *         - id_timeslot
 *         - id_class
 *       properties:
 *         lesson_datetime:
 *           type: string
 *         id_room:
 *           type: integer
 *         id_user:
 *           type: integer
 *         id_subject:
 *           type: integer
 *         id_timeslot:
 *           type: integer
 *         id_class:
 *           type: integer
 *       example:
 *         lesson_datetime: '2023-08-29T12:00:00Z'
 *         id_room: 1
 *         id_user: 1
 *         id_subject: 1
 *         id_timeslot: 1
 *         id_class: 1
 */

/**
 * @swagger
 * /lessons:
 *   get:
 *     tags: [Lesson]
 *     summary: Récupère la liste de toutes les lessons
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 */
router.get('/', lessonsController.getAll);

/**
 * @swagger
 * /lessons/{id}:
 *   get:
 *     tags: [Lesson]
 *     summary: Récupère une lesson par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lesson'
 */
router.get('/:id', lessonsController.getOneById);

/**
 * @swagger
 * /lessons:
 *   post:
 *     tags: [Lesson]
 *     summary: Crée une nouvelle lesson
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       201:
 *         description: Lesson créée
 */
router.post('/', lessonsController.createLesson);

/**
 * @swagger
 * /lessons/{id}:
 *   put:
 *     tags: [Lesson]
 *     summary: Met à jour une lesson par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       201:
 *         description: Lesson mise à jour
 */
router.put('/:id', lessonsController.updateOneById);

/**
 * @swagger
 * /lessons/{id}:
 *   delete:
 *     tags: [Lesson]
 *     summary: Supprime une lesson par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson supprimée
 */
router.delete('/:id', lessonsController.deleteOneById);

/**
 * @swagger
 * /lessons:
 *   delete:
 *     tags: [Lesson]
 *     summary: Supprime toutes les lessons
 *     responses:
 *       200:
 *         description: Toutes les lessons supprimées
 */
router.delete('/', lessonsController.deleteAll);

router.put('/:id', lessonsController.updateLesson);


module.exports = router;
