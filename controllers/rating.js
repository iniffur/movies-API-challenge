const Movie = require("../models/movie");
const User = require("../models/user");
const ratingService = require("../services/ratingService");

const addRating = async (req, res) => {
  try {
    const { userId, movieId, score } = req.query;
    const user = await User.findOne({ _id: userId });
    const movie = await Movie.findOne({ _id: movieId });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    } else if (!movie) {
      return res.status(404).send({ error: "Movie not found" });
    }

    if (score.length > 1 || score < 1 || score > 5) {
      throw new Error("Invalid rating inputted");
    }

    ratingService.handleRatings(movie, userId, movieId, score);

    return res.status(200).send("New rating accepted!");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { addRating };
