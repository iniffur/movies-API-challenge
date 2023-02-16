const app = require("../../app");
const request = require("supertest");
const User = require("../../models/user");
const Rating = require("../../models/rating");
const Movie = require("../../models/movie");
const mongoose = require("mongoose");
const { connectToDatabase } = require("../../databaseConnection");

describe("GET /movies/top5/:userId", () => {
  let userId;
  beforeEach(async () => {
    await connectToDatabase();
    await Movie.deleteMany({});
    await User.deleteMany({});
    await Rating.deleteMany({});
    setTimeout(() => {}, 1000);

    let user = await User.create({
      username: "erling_haaland",
    });
    userId = user._id;

    let movieOne = await Movie.create({
      title: "Inception",
      yearOfRelease: 2012,
      runningTime: 169,
      genres: ["Crime"],
      averageRating: 4,
    });
    let movieOneId = movieOne._id;

    let movieTwo = await Movie.create({
      title: "The Godfather",
      yearOfRelease: 1972,
      runningTime: 189,
      genres: ["Crime"],
      averageRating: 5,
    });
    let movieTwoId = movieTwo._id;

    let movieThree = await Movie.create({
      title: "The Godfather Part II",
      yearOfRelease: 1978,
      runningTime: 179,
      genres: ["Crime"],
      averageRating: 3,
    });
    let movieThreeId = movieThree._id;

    await Rating.create({
      userId: userId,
      movieId: movieOneId,
      score: 4,
    });
    await Rating.create({
      userId: userId,
      movieId: movieTwoId,
      score: 5,
    });
    await Rating.create({
      userId: userId,
      movieId: movieThreeId,
      score: 3,
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    await mongoose.connection.close();
  });

  it("returns top 5 with a valid user input", async () => {
    const response = await request(app).get(`/movies/top5/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0].title).toBe("The Godfather");
  });

  it("returns a 400 error if a query parameter is given", async () => {
    const response = await request(app).get(`/movies/top5/${userId}?a=a`);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid query");
  });

  it("returns a 404 error if user is not found", async () => {
    const response = await request(app).get(
      `/movies/top5/43ed4be0d63f3c2f2d004e8b`
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("User not found");
  });

  it("returns a 400 error if userId is invalid", async () => {
    const response = await request(app).get(`/movies/top5/asd`);
    expect(response.statusCode).toBe(400);
  });
});
