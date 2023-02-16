const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectToDatabase = () => {
  const database =
    process.env.NODE_ENV === "test"
      ? process.env.DATABASE_TEST
      : process.env.DATABASE;
  mongoose.set("strictQuery", false);
  const password = encodeURIComponent(process.env.MONGOOSE_PASSWORD);
  // const database = encodeURIComponent(process.env.DATABASE);
  const mongoDB = `mongodb+srv://iniffur:${password}@cluster0.crtcyqm.mongodb.net/${database}?retryWrites=true&w=majority`;

  main().catch((err) => console.log(err));
  async function main() {
    await mongoose.connect(mongoDB);
    console.log("Connected");
  }
};

module.exports = { connectToDatabase };
