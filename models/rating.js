const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  score: {
    type: Number,
    required: true,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    min: 1,
    max: 5,
  },
});

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
