const Movie = require("../../models/movie");
const mongoose = require("mongoose");
const { connectToDatabase } = require("../../databaseConnection");

describe("Movie model", () => {
  beforeEach(async () => {
    await connectToDatabase();
    await Movie.deleteMany({});
    setTimeout(() => {}, 500);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("saves a new movie", async () => {
    const movie = new Movie({
      title: "Fight Club",
      yearOfRelease: 2000,
      runningTime: 123,
      genres: ["Drama"],
    });
    const savedMovie = await movie.save();
    expect(savedMovie.title).toBe("Fight Club");
  });

  it("must have year of release", async () => {
    const movie = new Movie({
      title: "The Beach",
      runningTime: 123,
      genres: ["Drama"],
    });
    await expect(movie.save()).rejects.toThrow();
  });
});
