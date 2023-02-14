const Movie = require("../models/movie");
const Rating = require("../models/rating");
const User = require("../models/user");

const updateRating = async (rating, score) => {
  rating.score = score;
  await rating.save();
};

const createRating = async (userId, movieId, score) => {
  const newRating = new Rating({ userId, movieId, score });
  await newRating.save();
};

const updateAverageRating = async (movie, movieId) => {
  let ratings = await Rating.find({ movieId: movieId });

  let totalScore = 0;
  ratings.forEach((rating) => {
    totalScore += rating.score;
  });
  movie.averageRating = totalScore / ratings.length;
  await movie.save();
};

exports.addRating = async (req, res) => {
  try {
    const { userId, movieId, score } = req.query;
    const user = await User.findOne({ _id: userId });
    const movie = await Movie.findOne({ _id: movieId });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    } else if (!movie) {
      return res.status(404).send({ error: "Movie not found" });
    } else if (!score) {
      return res.status(400).send({ error: "No rating given" });
    }

    const existingRating = await Rating.findOne({ userId, movieId });
    if (existingRating) {
      await updateRating(existingRating, score);
    } else {
      await createRating(userId, movieId, score);
    }

    updateAverageRating(movie, movieId);

    return res.status(200).send("New rating accepted!");
  } catch (error) {
    res.status(400).send({ error: "Invalid rating inputted" });
  }
};
