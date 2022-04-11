const mongoose = require("mongoose");

const vagaSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tipo: {
    type: String,
    // enum: ["Estágio", "Meio Periodo"],
  },
  enviar: {
    email: String,
    assunto: String,
  },
  empresa: {
    _id: {
      type: mongoose.Types.ObjectId,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    descricao: {
      type: String,
    },
  },
  atividades: {
    type: Array,
  },
  requisitos: {
    type: Array,
  },
  habilidades: {
    type: Array,
  },
  beneficios: {
    type: Array,
  },
  cargo: {
    type: String,
  },
  descricao: {
    type: String,
  },
  formato: {
    type: String,
  },
  experiencia: {
    type: String,
  },
  localidade: {
    type: String,
  },
});

module.exports = mongoose.model("Vaga", vagaSchema);
