const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    photo: { type: String },
    username: { type: String },
    categories: { type: Array },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("post", PostSchema);
