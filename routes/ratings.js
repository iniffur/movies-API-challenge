const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating");

router.post("/addRating", ratingController.addRating);

module.exports = router;
