const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectToDatabase = () => {
  mongoose.set("strictQuery", false);
  const password = encodeURIComponent(process.env.MONGOOSE_PASSWORD);
  const mongoDB = `mongodb+srv://iniffur:${password}@cluster0.crtcyqm.mongodb.net/movies_database?retryWrites=true&w=majority`;

  main().catch((err) => console.log(err));
  async function main() {
    await mongoose.connect(mongoDB);
    console.log("Connected");
  }
};

module.exports = connectToDatabase;
