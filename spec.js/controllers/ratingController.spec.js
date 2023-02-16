const app = require("../../app");
const request = require("supertest");
const Movie = require("../../models/movie");
const Rating = require("../../models/rating");
const User = require("../../models/user");
const mongoose = require("mongoose");
const { connectToDatabase } = require("../../databaseConnection");

describe("post /ratings/addRating", () => {
  let userId;
  let movieOneId;
  let movieTwoId;
  let movieThreeId;

  beforeAll(async () => {
    await connectToDatabase();
    await Movie.deleteMany({});
    await User.deleteMany({});
    setTimeout(() => {}, 1000);

    let user = await User.create({
      username: "harry_potter",
    });
    userId = user._id;

    let movieOne = await Movie.create({
      title: "Inception",
      yearOfRelease: 2012,
      runningTime: 169,
      genres: ["Crime"],
      averageRating: 4,
    });
    movieOneId = movieOne._id;

    let movieTwo = await Movie.create({
      title: "The Godfather",
      yearOfRelease: 1972,
      runningTime: 189,
      genres: ["Crime"],
      averageRating: 5,
    });
    movieTwoId = movieTwo._id;

    let movieThree = await Movie.create({
      title: "The Godfather Part II",
      yearOfRelease: 1978,
      runningTime: 179,
      genres: ["Crime"],
      averageRating: 3,
    });
    movieThreeId = movieThree._id;

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

  it("returns a 404 error if user was not found", async () => {
    const response = await request(app).post(
      `/ratings/addRating?userId=${mongoose.Types.ObjectId()}&movieId=${movieOneId}&score=4`
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("User not found");
  });

  it("successfully updates ratings", async () => {
    const response = await request(app).post(
      `/ratings/addRating?userId=${userId}&movieId=${movieOneId}&score=1`
    );
    expect(response.statusCode).toBe(200);
  });
});
