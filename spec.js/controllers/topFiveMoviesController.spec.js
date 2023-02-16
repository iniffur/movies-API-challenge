const app = require("../../app");
const request = require("supertest");
const Movie = require("../../models/movie");
const mongoose = require("mongoose");
const { connectToDatabase } = require("../../databaseConnection");

describe("GET /movies/top5", () => {
  beforeEach(async () => {
    await connectToDatabase();

    await Movie.deleteMany({});
    setTimeout(() => {}, 500);
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    await mongoose.connection.close();
  });

  it("returns a 400 error if a query is given", async () => {
    const response = await request(app).get("/movies/top5?yearOfRelease=1973");
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid query");
  });

  it("returns a 404 error if no movies found", async () => {
    const response = await request(app).get("/movies/top5");
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Movies not found");
  });

  it("correctly ranks movies", async () => {
    await Movie.create({
      title: "Inception",
      yearOfRelease: 2012,
      runningTime: 169,
      genres: ["Crime"],
      averageRating: 4,
    });
    await Movie.create({
      title: "The Godfather",
      yearOfRelease: 1972,
      runningTime: 189,
      genres: ["Crime"],
      averageRating: 5,
    });
    const response = await request(app).get("/movies/top5");
    expect(response.statusCode).toBe(200);
    expect(response.body[0].title).toBe("The Godfather");
  });
});
