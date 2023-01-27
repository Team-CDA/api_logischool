
const { Router } = require ("express")
const userController = require("../controllers/users-controller")
const router = Router()

//On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
/**
 * @swagger
 *  components: 
 *    schemas:
 *       Users:
 *          type: object
 *          required: 
 *              - role
 *          properties: 
 *             id:
 *               type: integer
 *               description: L'id qui représente le rôle
 *             firstname:
 *               type: string
 *               description: Le prénom de l'utilisateur                
 *             lastname:
 *               type: string
 *               description: Le nom de l'utilisateur                
 *             birthdate:
 *               type: date
 *               description: La date de naissance de l'utilisateur                
 *             adress:
 *               type: string
 *               description: L'adresse de l'utilisateur                
 *             city:
 *               type: string
 *               description: La ville de l'utilisateur        
 *             zipcode:
 *               type: string
 *               description: Le code postal de l'utilisateur    
 *             mail:
 *               type: string
 *               description: L'adresse mail de l'utilisateur  
 *             phone:
 *               type: string
 *               description: Le numéro de téléphone de l'utilisateur  
 *             ine:
 *               type: string
 *               description: Le numéro INE de l'utilisateur
 *             id_first_tutor:
 *               type: integer
 *               description: L'id du premier tuteur de l'utilisateur
 *             id_second_tutor:
 *               type: integer
 *               description: L'id du second tuteur de l'utilisateur
 *             id_establishment:
 *               type: integer
 *               description: L'id de l'établissement de l'utilisateur
 *             id_class:
 *               type: integer
 *               description: L'id de la classe de l'utilisateur
 *             id_gender:
 *               type: integer
 *               description: L'id du genre de l'utilisateur
 *             id_role:
 *               type: integer
 *               description: L'id du rôle de l'utilisateur
 *             id_status:
 *               type: integer
 *               description: L'id du statut de l'utilisateur
 *             updatedAt:
 *               type: date
 *               description: La date de la dernière modification du rôle
 *          example: 
 *             id: 1
 *             firstname: "Jean"
 *             lastname: "Dupont"
 *             birthdate: 2000-12-14
 *             adress: "1 rue de la paix"
 *             city: "Paris"
 *             zipcode: "75000"
 *             mail: "lol@gmail.com"
 *             phone: "0606060606"
 *             ine: "123456789"
 *             id_first_tutor: 1
 *             id_second_tutor: 2
 *             id_establishment: 1
 *             id_class: 1
 *             id_gender: 1
 *             id_role: 1
 *             id_status: 1
 *             createdAt: 2022-12-14T12:45:48
 *             updatedAt: 2022-12-14T12:46:48
 * 
 * 
 */


/** 
 * @swagger
 * 
 * /users:     
 *    get:
 *      tags: [Utilisateurs]
 *      summary: Récupère la liste de tous les utilisateurs
 *      responses: 
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Utilisateurs'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/', userController.getAllUsers)

/** 
 * @swagger
 * 
 * /users/{id}:
 *    get:
 *      tags: [Utilisateurs]
 *      summary: Récupère un utilisateurs par son id
 *      description: Récupère un utilisateurs par son id
 *      responses: 
 *         200:
 *            description: Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Utilisateurs'
 *         404:
 *            description: the table was not found
 * 
 */
router.get('/:id', userController.getOneById)

/** 
 * @swagger
 * 
 * /users/create:
 *    post:
 *      tags: [Utilisateurs]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Utilisateurs'
 *      summary: Permet d'ajouter un nouveau utilisateur
 *      description: En Remplissant le formulaire, vous pouvez créer un nouveau utilisateur.
 *      responses: 
 *         200:
 *            description: Role successfully created
 * 
 *         
 */
router.post('/create', userController.createOne)


/** 
 * @swagger
 * 
 * /users/update/{id}:
 *    patch:
 *      tags: [Utilisateurs]
 *      summary: Permet la modification d'un utilisateur
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/Utilisateurs'
 *    description: Grâce à l'id d'un utilisateur vous pouvez modifier certaine information.
 *    responses:
 *         200:
 *          description: Role successfully updated
 *         
 */
router.patch('/update/:id', userController.updateOneById)


/** 
 * @swagger
 * 
 * /users/delete/{id}:
 *    delete:
 *      tags: [Utilisateurs]
 *      summary: Permet la suppression d'un utilisateur
 *      description: Passer l'id du rôle que vous souhaitez supprimer en url et le tour est joué.
 *      responses:
 *         200:
 *          description: user successfully deleted
 *         
 */
router.delete('/delete/:id', userController.deleteOneById)

module.exports = router