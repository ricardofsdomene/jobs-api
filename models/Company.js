const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Company", usuarioSchema);
