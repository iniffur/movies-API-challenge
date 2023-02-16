const app = require("../../app");
const request = require("supertest");
const Movie = require("../../models/movie");
const mongoose = require("mongoose");
const { connectToDatabase } = require("../../databaseConnection");

describe("GET /movies", () => {
  beforeAll(async () => {
    connectToDatabase();

    setTimeout(() => {}, 500);
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    await mongoose.connection.close();
  });

  it("returns a 200 status code if movie found", async () => {
    await Movie.create({
      title: "The Godfather",
      yearOfRelease: 1972,
      runningTime: 193,
      genres: ["Crime"],
    });
    const response = await request(app).get("/movies?yearOfRelease=1972");
    expect(response.statusCode).toBe(200);
    expect(response.body[0].title).toBe("The Godfather");
  });

  it("returns a 404 error if movie not found", async () => {
    const response = await request(app).get("/movies?yearOfRelease=1973");
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Movie not found");
  });

  it("returns a 400 error if given invalid parameters", async () => {
    const response = await request(app).get("/movies?asdas=asdads");
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid query parameter");
  });

  it("returns a 400 error if no parameters given", async () => {
    const response = await request(app).get("/movies");
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("No criteria given");
  });
});
