const Movie = require("../models/movie");
const Rating = require("../models/rating");
const User = require("../models/user");
const roundAverageRating = require("../services.js/movieService");

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
  const movieIds = userRatings.map((rating) => rating.movieId);
  const movies = await Movie.find({ _id: { $in: movieIds } });
  const sortedMovies = getSortedMovies(movies, userRatings);
  roundAverageRating(sortedMovies);

  if (sortedMovies.length === 0) {
    return res.status(404).send({ error: "Movies not found" });
  } else {
    return res.status(200).send(sortedMovies);
  }
};
