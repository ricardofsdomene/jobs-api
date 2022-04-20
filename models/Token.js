const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  refreshToken: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
