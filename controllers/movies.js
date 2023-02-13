const Movie = require("../models/movie");

exports.getMovies = async (req, res) => {
  let movies = await Movie.find();
  const { title, yearOfRelease, genres } = req.query;

  if (title) {
    movies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  if (yearOfRelease) {
    movies = movies.filter((movie) => movie.yearOfRelease == yearOfRelease);
  }
  if (genres) {
    movies = movies.filter((movie) =>
      movie.genres
        .map((genre) => genre.toLowerCase())
        .includes(genres.toLowerCase())
    );
  }

  if (!title && !yearOfRelease && !genres) {
    return res.status(400).send({ error: "Invalid or no criteria given" });
  } else if (movies.length === 0) {
    return res.status(404).send({ error: "Movie not found" });
  } else {
    return res.status(200).send(movies);
  }
};
