const Rating = require("../models/rating");

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

const handleRatings = async (movie, userId, movieId, score) => {
  const existingRating = await Rating.findOne({ userId, movieId });
  if (existingRating) {
    await updateRating(existingRating, score);
  } else {
    await createRating(userId, movieId, score);
  }

  updateAverageRating(movie, movieId);
};

module.exports = {
  updateRating,
  createRating,
  updateAverageRating,
  handleRatings,
};
