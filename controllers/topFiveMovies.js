const topFiveMoviesService = require("../services/topFiveMoviesService");

const handleInvalidQuery = (req, res) => {
  if (Object.keys(req.query).length > 0) {
    return res.status(400).send({ error: "Invalid query" });
  }
};

const handleMoviesResponse = (res, movies) => {
  if (movies.length === 0) {
    return res.status(404).send({ error: "Movies not found" });
  } else {
    return res.status(200).send(movies);
  }
};

const getTopFiveMovies = async (req, res) => {
  if (handleInvalidQuery(req, res)) {
    return;
  }
  const movies = await topFiveMoviesService.getFilteredTopFive();
  return handleMoviesResponse(res, movies);
};

module.exports = { handleInvalidQuery, handleMoviesResponse, getTopFiveMovies };
