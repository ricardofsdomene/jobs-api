const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Empresa = require("../models/Empresa");

const JWT_SECRET = "f1naancial!";

exports.create = async (req, res) => {
  try {
    const { name, avatar, description } = req.body;

    const empresa = new Empresa({
      name,
      avatar,
      description,
    });
    await empresa.save();

    return res.json({ message: "Empresa criada com sucesso!" });
  } catch (err) {
    return res.json({
      error: true,
      message: "Erro ao criar empresa, tente novamente mais tarde",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const empresas = await Empresa.paginate({}, { page, limit: 10 });

    return res.json(empresas);
  } catch (e) {
    return res.status(500).json({ stauts: "Erro!", erorr: e });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params._id;

    await Empresa.findByIdAndDelete(id).then(() => {
      return res.json({ message: "Empresa deletada com sucesso!" });
    });
  } catch (e) {
    return res.status(400).json({ status: "Erro!", error: e });
  }
};
