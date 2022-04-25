const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const empresaSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  description: {
    type: String,
  },
});

empresaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Empresa", empresaSchema);
