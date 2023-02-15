const Rating = require("../models/rating");
const User = require("../models/user");
const topFiveMovies = require("../controllers/topFiveMovies");
const topFiveMoviesByUserService = require("../services/topFiveMoviesByUserService");

const getTopFiveMoviesByUser = async (req, res) => {
  try {
    if (topFiveMovies.handleInvalidQuery(req, res)) {
      return;
    }

    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const userRatings = await Rating.find({ userId: req.params.userId }).sort({
      score: -1,
    });
    const movies = await topFiveMoviesByUserService.sortMovies(userRatings);

    return topFiveMovies.handleMoviesResponse(res, movies);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getTopFiveMoviesByUser };
