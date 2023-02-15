const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movies");
const topFiveController = require("../controllers/topFiveMovies");
const topFiveByUserController = require("../controllers/topFiveMoviesByUser");

router.get("/", movieController.getMovies);
router.get("/top5", topFiveController.getTopFiveMovies);
router.get("/top5/:userId", topFiveByUserController.getTopFiveMoviesByUser);

module.exports = router;
