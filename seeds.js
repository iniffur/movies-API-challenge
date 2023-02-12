const dotenv = require("dotenv");

const mongoose = require("mongoose");
const User = require("./models/user");
const Movie = require("./models/movie");
const Rating = require("./models/rating");

dotenv.config();

mongoose.set("strictQuery", false);
const password = encodeURIComponent(process.env.MONGOOSE_PASSWORD);
const mongoDB = `mongodb+srv://iniffur:${password}@cluster0.crtcyqm.mongodb.net/movies_database?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected");
}

const users = [
  { username: "steven_gerrard" },
  { username: "frank_lampard" },
  { username: "ashley_cole" },
  { username: "rio_ferdinand" },
  { username: "joe_cole" },
  { username: "david_beckham" },
  { username: "peter_crouch" },
  { username: "michael_owen" },
  { username: "gary_neville" },
  { username: "david_james" },
];

const movies = [
  {
    title: "The Shawshank Redemption",
    yearOfRelease: 1994,
    runningTime: 142,
    genres: ["Drama"],
    averageRating: 5,
  },
  {
    title: "The Godfather",
    yearOfRelease: 1972,
    runningTime: 175,
    genres: ["Crime", "Drama"],
    averageRating: 5,
  },
  {
    title: "The Dark Knight",
    yearOfRelease: 2008,
    runningTime: 152,
    genres: ["Action", "Crime", "Drama"],
    averageRating: 5,
  },
  {
    title: "The Godfather: Part II",
    yearOfRelease: 1974,
    runningTime: 200,
    genres: ["Crime", "Drama"],
    averageRating: 5,
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    yearOfRelease: 2003,
    runningTime: 201,
    genres: ["Adventure", "Drama", "Fantasy"],
    averageRating: 5,
  },
  {
    title: "Pulp Fiction",
    yearOfRelease: 1994,
    runningTime: 154,
    genres: ["Crime", "Drama"],
    averageRating: 5,
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    yearOfRelease: 2001,
    runningTime: 178,
    genres: ["Adventure", "Drama", "Fantasy"],
    averageRating: 5,
  },
  {
    title: "Forrest Gump",
    yearOfRelease: 1994,
    runningTime: 142,
    genres: ["Drama", "Romance"],
    averageRating: 5,
  },
  {
    title: "Inception",
    yearOfRelease: 2010,
    runningTime: 148,
    genres: ["Action", "Adventure", "Sci-Fi"],
    averageRating: 5,
  },
  {
    title: "The Matrix",
    yearOfRelease: 1999,
    runningTime: 136,
    genres: ["Action", "Sci-Fi"],
    averageRating: 5,
  },
];

const seedMovies = async () => {
  for (const movie of movies) {
    const newMovie = new Movie(movie);
    await newMovie.save();
  }
};

const seedUsers = async () => {
  for (const user of users) {
    const newUser = new User(user);
    await newUser.save();
  }
};

const seedRatings = async () => {
  const allMovies = await Movie.find();
  const allUsers = await User.find();

  for (const movie of allMovies) {
    for (const user of allUsers) {
      const rating = Math.floor(Math.random() * 5) + 1;
      const newRating = new Rating({
        movieId: movie._id,
        userId: user._id,
        score: rating,
      });
      await newRating.save();
    }
  }
};

const seedDB = async () => {
  await User.deleteMany({});
  await Movie.deleteMany({});
  await Rating.deleteMany({});
  await seedMovies();
  await seedUsers();
  await seedRatings();
  mongoose.connection.close();
};

seedDB();
