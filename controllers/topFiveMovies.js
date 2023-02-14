const Movie = require("../models/movie");

exports.getTopFiveMovies = async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    return res.status(400).send({ error: "Invalid query" });
  }

  const movies = await Movie.find()
    .sort({ averageRating: -1, title: 1 })
    .limit(5);
  if (movies.length === 0) {
    return res.status(404).send({ error: "Movies not found" });
  } else {
    return res.status(200).send(movies);
  }
};
