const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: { type: String, required: true },
  yearOfRelease: {
    type: Number,
    required: true,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
  runningTime: {
    type: Number,
    required: true,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
  genres: [{ type: String, required: true }],
  averageRating: { type: Number, required: false },
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
