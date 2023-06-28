const { Router } = require("express");
const router = Router();
const homeworksController = require("../controllers/homeworks-controller");
const multerMultipleFiles = require("../helpers/multer-config");

module.exports = router;

/**
 * @swagger
 *  components:
 *    schemas:
 *       homeworks:
 *          type: object
 *          required:
 *              - role
 *          properties:
 *             id:
 *               type: integer
 *               description: homework's id
 *             homework_image:
 *               type: string
 *               description: exercice file name
 *             correction_image:
 *               type: string
 *               description: correction file name
 *             name:
 *               type: string
 *               description: correction's name
 *             id_user:
 *               type: integer
 *               description: user's id (the teacher that owns homeworks)
 *             id_subject:
 *               type: integer
 *               description: subject's id
 *          example:
 *             id: 1
 *             name: A
 *             homework_image: 'exercice-1.png'
 *             correction_image: 'correction-1.png'
 *             id_user: 1
 *             id_subject: 1
 *
 */

/**
 * @swagger
 *
 * /homeworks/classes/daterange:
 *    get:
 *      tags: [Homeworks]
 *      parameters:
 *        - in: path
 *          name: startingDate
 *          schema:
 *            type: dateTime
 *        - in: path
 *          name: endingDate
 *          schema:
 *            type: dateTime
 *      summary: get homeworks_classes for a daterange
 *      description: by specifying two dates, you can retrieve all elements contained inbetween the daterange provided
 *      responses:
 *         200:
 *            description: homeworks_classes successfully retrieved
 */
router.get(
  "/classes/daterange",
  multerMultipleFiles,
  homeworksController.getByDateRangeHC
);

/**
 * @swagger
 *
 * /homeworks/filter?:
 *    get:
 *      tags: [Homeworks]
 *      parameters:
 *       - in: query
 *         name: id_teacher
 *         type: integer
 *         description: the teacher Id (the id from the users table)
 *       - in: query
 *         name: id_subject
 *         type: integer
 *         description: the subject id
 *      summary: get all homeworks
 *      description: Get list of all homeworks,if provided, you can filter the resuls with id_teacher or id_subject
 *      responses:
 *         200:
 *            description: homework(s) successfully retrieved
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/homeworks'
 *         404:
 *            description: no homeworks found
 */
router.get("/filter", multerMultipleFiles, homeworksController.getWithFilter);

/**
 * @swagger
 *
 * /homeworks/:
 *    get:
 *      tags: [Homeworks]
 *      summary: get all homeworks
 *      description: Get list of all homeworks
 *      responses:
 *         200:
 *            description: homeworks successfully retrieved
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/homeworks'
 *         404:
 *            description: no homeworks found
 */
router.get("/", multerMultipleFiles, homeworksController.getAll);

router.get("/:idClass/:idSubject", homeworksController.getAllByIdClassAndIdSubject);

/**
 * @swagger
 *
 * /homeworks/{id}:
 *    get:
 *      tags: [Homeworks]
 *      summary: get homework for a specific id
 *      description: By providing an id you can get the details of this homework
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *         200:
 *            description: homework successfully retrieved
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/homeworks'
 *         404:
 *            description: this specific homework was not found
 */
router.get("/:id", multerMultipleFiles, homeworksController.getOneById);

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
 *                 $ref: '#/components/schemas/homeworks'
 *      summary: create homework
 *      description: create homework linked to a specfic user.
 *      responses:
 *         200:
 *            description: homeworks successfully created
 */
router.post("/", multerMultipleFiles, homeworksController.create);

router.put("/link", multerMultipleFiles, homeworksController.linkTwoFiles);

/**
 * @swagger
 *
 * /homeworks/update/{id}:
 *    put:
 *      tags: [Homeworks]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/homeworks'
 *      summary: update homework
 *      description: based on a id, you can update an homework, or files linked to it.
 *      responses:
 *         200:
 *            description: homeworks successfully updated
 */
router.put("/:id", multerMultipleFiles, homeworksController.update);

/**
 * @swagger
 *
 * /homeworks/delete/{id}:
 *    delete:
 *      tags: [Homeworks]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: the homework Id you want to delete
 *      summary: By using an id you can delete a homework and all linked files
 *      description:
 *      responses:
 *         200:
 *            description: homework successfully deleted
 *         404:
 *            description: the homeworks table was not found
 *
 */
router.delete("/:id", multerMultipleFiles, homeworksController.deleteOneById);

/**
 * @swagger
 *
 * /homeworks/{id}/{file}:
 *    get:
 *      tags: [Homeworks]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: the homework Id you want to get
 *        - in: path
 *          name: file
 *          schema:
 *            type: string
 *          required: true
 *          description: the file type you want to DL =>  exercice/correction
 *      summary: By using an id and a file type you can download the file
 *      description:
 *      responses:
 *         200:
 *            description: homework successfully deleted
 *         404:
 *            description: the homeworks table was not found
 *
 */
router.get(
  "/:id/:file",
  multerMultipleFiles,
  homeworksController.getOneFileById
);

// **************************************************
// *************Partie homeworks_classes*************
// **************************************************

/**
 * @swagger
 *  components:
 *    schemas:
 *       homeworks_classes:
 *          type: object
 *          required:
 *              - role
 *          properties:
 *             id:
 *               type: integer
 *               description: association's id
 *             id_class:
 *               type: integer
 *               description: class' id
 *             id_homework:
 *               type: integer
 *               description: homework's id
 *             plannified_date:
 *               type: string
 *               description: plannified date for a class and a homework
 *             correction_date:
 *               type: integer
 *               description: date to make correction visible for everyone(can be used as a boolean)
 *          example:
 *             id_class: 1
 *             id_homework: 1
 *             plannified_date: 2022-01-01 12:00:00
 *             correction_date: 2022-01-05 12:00:00
 *
 */

/**
 * @swagger
 *
 * /homeworks/classes/{id}:
 *    get:
 *      tags: [Homeworks]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *      summary: get homeworks_classes
 *      description: get homeworks linked to a specfic user.
 *      responses:
 *         200:
 *            description: homeworks_classes successfully retrieved
 */
router.get(
  "/classes/:id",
  multerMultipleFiles,
  homeworksController.getOneByIdHC
);

/**
 * @swagger
 *
 * /homeworks/classes/create:
 *    post:
 *      tags: [Homeworks]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/homeworks_classes'
 *      summary: create homework
 *      description: create homework associated to a specific class.
 *      responses:
 *         200:
 *            description: homeworks_classes successfully created
 */
router.post(
  "/classes/create",
  multerMultipleFiles,
  homeworksController.createHC
);

/**
 * @swagger
 *
 * /homeworks/classes/update/{id}:
 *    put:
 *      tags: [Homeworks]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/homeworks_classes'
 *      summary: update homeworks_classes
 *      description: update homework linked to a specfic user.
 *      responses:
 *         200:
 *            description: homeworks_classes successfully updatted
 */
router.put(
  "/classes/update/:id",
  multerMultipleFiles,
  homeworksController.updateHC
);

/**
 * @swagger
 *
 * /homeworks/classes/{id}:
 *    delete:
 *      tags: [Homeworks]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *      summary: delete homeworks_classes
 *      description: delete homeworks linked to a specfic classes.
 *      responses:
 *         200:
 *            description: homeworks_classes successfully deleted
 */
router.delete(
  "/classes/:id",
  multerMultipleFiles,
  homeworksController.deleteOneByIdHC
);
