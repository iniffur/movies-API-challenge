const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const password = encodeURIComponent(process.env.MONGOOSE_PASSWORD);
const mongoDB = `mongodb+srv://iniffur:${password}@cluster0.crtcyqm.mongodb.net/movies_database?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected");
}
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app;
