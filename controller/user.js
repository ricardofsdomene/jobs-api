const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

const JWT_SECRET = "f1naancial!";

exports.getFollowing = async (req, res) => {
  try {
    console.log(req.params);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const users = await Usuario.paginate({}, { page, limit: 10 });

    return res.json(users);
  } catch (e) {
    return res.status(500).json({ stauts: "Erro!", erorr: e });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params._id;

    await Usuario.findByIdAndDelete(id).then(() => {
      return res.json({ message: "Usuario deletado com sucesso!" });
    });
  } catch (e) {
    return res.status(400).json({ status: "Erro!", error: e });
  }
};
