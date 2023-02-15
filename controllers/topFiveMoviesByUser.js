const Rating = require("../models/rating");
const User = require("../models/user");
const topFiveMoviesByUserService = require("../services/topFiveMoviesByUserService");

const getTopFiveMoviesByUser = async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    return res.status(400).send({ error: "Invalid query" });
  }

  const user = await User.findOne({ _id: req.params.userId });
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  const userRatings = await Rating.find({ userId: req.params.userId }).sort({
    score: -1,
  });
  const movies = await topFiveMoviesByUserService.sortMovies(userRatings);

  if (movies.length === 0) {
    return res.status(404).send({ error: "Movies not found" });
  } else {
    return res.status(200).send(movies);
  }
};

module.exports = { getTopFiveMoviesByUser };
