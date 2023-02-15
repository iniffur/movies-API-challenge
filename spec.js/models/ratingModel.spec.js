const Rating = require("../../models/rating");
const mongoose = require("mongoose");
const connectToDatabase = require("../../databaseConnection");

describe("Rating model", () => {
  beforeAll(async () => {
    connectToDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("saves a new rating", async () => {
    const rating = new Rating({
      userId: "63ed24429e5b3bdb4fe0e96b",
      movieId: "63ed24429e5b3bdb4fe0e957",
      score: 5,
    });
    const savedRating = await rating.save();
    expect(savedRating.score).toBe(5);
  });

  it("must have a valid score", async () => {
    const rating = new Rating({
      userId: "63ed24429e5b3bdb4fe0e96b",
      movieId: "63ed24429e5b3bdb4fe0e957",
      score: 9,
    });
    await expect(rating.save()).rejects.toThrow();
  });
});
