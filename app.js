const express = require("express");
const app = express();
const movieRoutes = require("./routes/movies");
const ratingRoutes = require("./routes/ratings");
const connectToDatabase = require("./databaseConnection");

connectToDatabase();

app.use("/movies", movieRoutes);
app.use("/ratings", ratingRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app;
