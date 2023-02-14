const roundAverageRating = (movies) => {
  movies.forEach((movie) => {
    const roundedRating = Math.round(movie.averageRating * 2) / 2;
    movie.averageRating = roundedRating;
  });
};

module.exports = roundAverageRating;
