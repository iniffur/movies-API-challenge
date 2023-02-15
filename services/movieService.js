const Movie = require("../models/movie");

const querySearch = (movies, title, yearOfRelease, genres) => {
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
  return movies;
};

const roundAverageRating = (movies) => {
  movies.forEach((movie) => {
    const roundedRating = Math.round(movie.averageRating * 2) / 2;
    movie.averageRating = roundedRating;
  });
  return movies;
};

const getFilteredMovies = async (title, yearOfRelease, genres) => {
  const movies = await Movie.find();
  const filteredMovies = querySearch(movies, title, yearOfRelease, genres);
  roundAverageRating(filteredMovies);
  return filteredMovies;
};

module.exports = { querySearch, roundAverageRating, getFilteredMovies };
