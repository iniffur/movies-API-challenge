const movieService = require("../services/movieService");

const getMovies = async (req, res) => {
  const { title, yearOfRelease, genres } = req.query;

  if (
    Object.keys(req.query).some(
      (key) => key !== "title" && key !== "yearOfRelease" && key !== "genres"
    )
  ) {
    return res.status(400).send({ error: "Invalid query parameter" });
  }

  const movies = await movieService.getFilteredMovies(
    title,
    yearOfRelease,
    genres
  );

  if (!title && !yearOfRelease && !genres) {
    return res.status(400).send({ error: "No criteria given" });
  } else if (movies.length === 0) {
    return res.status(404).send({ error: "Movie not found" });
  } else {
    return res.status(200).send(movies);
  }
};

module.exports = { getMovies };
