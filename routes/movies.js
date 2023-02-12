const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movies");
const topFiveController = require("../controllers/topFiveMovies");
const topFiveByIdController = require("../controllers/topFiveMoviesById");

router.get("/", movieController.getMovies);

module.exports = router;
