const User = require("../../models/user");
const mongoose = require("mongoose");
const { connectToDatabase } = require("../../databaseConnection");

describe("User model", () => {
  beforeAll(async () => {
    connectToDatabase();
    await User.deleteMany({});
    setTimeout(() => {}, 500);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("saves a new user", async () => {
    const user = new User({
      username: "david_bowie",
    });
    const savedUser = await user.save();
    expect(savedUser.username).toBe("david_bowie");
  });

  it("must have a username", async () => {
    const user = new User();
    await expect(user.save()).rejects.toThrow();
  });
});
