const Movie = require("../models/movie");
const Rating = require("../models/rating");

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

exports.getTopFiveMoviesByUser = async (req, res) => {
  const userRatings = await Rating.find({ userId: req.params.userId }).sort({
    score: -1,
  });
  const movieIds = userRatings.map((rating) => rating.movieId);
  const movies = await Movie.find({ _id: { $in: movieIds } });
  const sortedMovies = getSortedMovies(movies, userRatings);

  if (sortedMovies.length === 0) {
    return res.status(404).send({ error: "Movies not found" });
  } else {
    return res.status(200).send(sortedMovies);
  }
};
