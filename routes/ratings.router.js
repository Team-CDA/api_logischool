const { Router } = require("express");
const jwt = require("jsonwebtoken");
const ratingController = require("../controllers/ratings-controller");
const router = Router();
const { checkRatingCredentials, getRatingByMail } = ratingController;

router.get("/", ratingController.getAllRatings);

router.get("/:id", ratingController.getOneById);

// Création d'une appréciation
router.post("/create", ratingController.createRating);

// Mise à jour d'une appréciation
router.patch("/update/:id", ratingController.updateRating);

// Suppression d'une appréciation
router.delete("/delete/:id", ratingController.deleteRating);

module.exports = router;
