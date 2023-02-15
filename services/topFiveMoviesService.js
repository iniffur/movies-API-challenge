const Movie = require("../models/movie");
const { roundAverageRating } = require("../services/movieService");

const getFilteredTopFive = async () => {
  const movies = await Movie.find()
    .sort({ averageRating: -1, title: 1 })
    .limit(5);
  roundAverageRating(movies);
  return movies;
};

module.exports = { getFilteredTopFive };
