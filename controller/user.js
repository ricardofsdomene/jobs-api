const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

const JWT_SECRET = "f1naancial!";

exports.getFollowing = async (req, res) => {
  try {
    console.log(req.params);
  } catch(error) {
    return res.status(500).json({ error })
  }
}