const topFiveMoviesService = require("../services/topFiveMoviesService");

const getTopFiveMovies = async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    return res.status(400).send({ error: "Invalid query" });
  }

  const movies = await topFiveMoviesService.getFilteredTopFive();

  if (movies.length === 0) {
    return res.status(404).send({ error: "Movies not found" });
  } else {
    return res.status(200).send(movies);
  }
};

module.exports = { getTopFiveMovies };
