const Movie = require("../models/movie");

exports.getMovies = async (req, res) => {
  let movies = await Movie.find();

  if (req.query.title) {
    movies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(req.query.title.toLowerCase())
    );
  }
  if (req.query.yearOfRelease) {
    movies = movies.filter(
      (movie) => movie.yearOfRelease == req.query.yearOfRelease
    );
  }
  if (req.query.genres) {
    movies = movies.filter((movie) =>
      movie.genres
        .map((genre) => genre.toLowerCase())
        .includes(req.query.genres.toLowerCase())
    );
  }

  if (!req.query.title && !req.query.yearOfRelease && !req.query.genres) {
    return res.status(400).send({ error: "Invalid or no criteria given" });
  } else if (movies.length === 0) {
    return res.status(404).send({ error: "Movie not found" });
  } else {
    return res.status(200).send(movies);
  }
};
