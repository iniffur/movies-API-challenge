const movieService = require("../services/movieService");

const getMovies = async (req, res) => {
  const { title, yearOfRelease, genres } = req.query;

  const movies = await movieService.getFilteredMovies(
    title,
    yearOfRelease,
    genres
  );

  if (!title && !yearOfRelease && !genres) {
    return res.status(400).send({ error: "Invalid or no criteria given" });
  } else if (movies.length === 0) {
    return res.status(404).send({ error: "Movie not found" });
  } else {
    return res.status(200).send(movies);
  }
};

module.exports = { getMovies };
