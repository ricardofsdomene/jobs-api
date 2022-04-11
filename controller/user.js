const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

const JWT_SECRET = "f1naancial!";

exports.fetchId = async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await Usuario.findOne({ _id }).lean();
    return res.json(user);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Usuario.findOne({ email }).lean();

    if (email.length == 0) {
      return res.json({ status: "Erro!", error: "Qual é o seu email?" });
    }

    if (!user) {
      return res.json({ status: "Erro!", error: "Usario invalido" });
    }

    if (password.length == 0) {
      return res.json({ status: "Erro!", error: "Qual é a sua senha?" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        JWT_SECRET
      );

      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      const data = { token: token, user: userData };

      return res.json({ status: "Usuário logado com sucesso!", data: data });
    } else {
      return res.json({ status: "Erro!", error: "Senha incorreta" });
    }
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

exports.sandBox = async (req, res) => {
  try {
    return res.status(201).json({ status: "On" });
  } catch (error) {
    return res.status(500).json({ status: "Erro!" });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    if (name.length === 0) {
      return res.json({
        status: "Erro!",
        error: "Você precisa inserir seu nome",
      });
    }

    if (email.length === 0) {
      return res.json({
        status: "Erro!",
        error: "Você precisa inserir seu email",
      });
    }

    if (password.length < 8) {
      return res.json({
        status: "Erro!",
        error: "Sua senha deve conter no minimo 8 digitos",
      });
    }

    const e_email = await Usuario.findOne({ email }).lean();
    if (e_email) {
      return res.json({
        status: "Erro!",
        error: "Esse email já foi registrado",
      });
    }

    const crypted_password = await bcrypt.hash(password, 10);

    const user = new Usuario({
      name,
      email,
      password: crypted_password
    });
    await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET
    );

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    const data = { token: token, user: userData };

    return res.json({ status: "Usuário criado com sucesso!", data });
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};
