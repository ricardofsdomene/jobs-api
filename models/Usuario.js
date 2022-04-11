const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    min: [5, "Insira seu nome completo"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    min: [5, "Insira um email válido"],
    max: 11,
  },
  password: {
    type: String,
    min: [8, "Sua senha precisa conter pelo menos 8 digitos"],
    required: true,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
