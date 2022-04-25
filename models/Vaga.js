const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const vagaSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  empresa: {
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    _id: {
      // type: mongoose.Types.ObjectId
      type: String
    }
  },
  tipo: {
    type: String,
    // enum: ["Estágio", "Meio Periodo"],
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
  localidade: {
    type: String,
  },
  requisitos: {
    type: Array
  },
  habilidades: {
    type: Array
  },
  beneficios: {
    type: Array
  },
});

vagaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Vaga", vagaSchema);
