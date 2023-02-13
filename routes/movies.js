const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movies");
const topFiveController = require("../controllers/topFiveMovies");
const topFiveByIdController = require("../controllers/topFiveMoviesById");

router.get("/", movieController.getMovies);
router.get("/top5", topFiveController.getTopFiveMovies);

module.exports = router;
