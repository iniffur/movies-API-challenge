const Movie = require("../models/movie");
const { roundAverageRating } = require("./movieService");

const getSortedMovies = (movies, userRatings) => {
  const getRating = (movie) =>
    userRatings.find(
      (rating) => rating.movieId.toString() === movie._id.toString()
    ).score;

  return movies
    .sort((a, b) => {
      const diff = getRating(b) - getRating(a);
      if (diff === 0) {
        return a.title.localeCompare(b.title);
      }
      return diff;
    })
    .slice(0, 5);
};

const sortMovies = async (userRatings) => {
  const movieIds = userRatings.map((rating) => rating.movieId);
  const movies = await Movie.find({ _id: { $in: movieIds } });
  const sortedMovies = getSortedMovies(movies, userRatings);
  roundAverageRating(sortedMovies);
  return sortedMovies;
};

module.exports = { getSortedMovies, sortMovies };
