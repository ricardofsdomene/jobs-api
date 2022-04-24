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
    Usuario.find({}).then((users) => {
      return res.json(users);
    })
  } catch (error) {
    return res.status(500).json({ error: true, code: "ops" });
  }
};
