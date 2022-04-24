const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const JWT_SECRET = "f1naancial!";

const authController = require("../controller/auth");

function checkAuthMiddleware(request, response) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Token not present.",
    });
  }

  const [, token] = authorization?.split(" ");

  if (!token) {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Token not present.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    request.user = decoded.email;

    return next();
  } catch (error) {
    const decoded = jwt.verify(token, JWT_SECRET);
    return response.status(401).json({
      error: decoded.email,
      code: "token.expired",
      message: "Token invalid.",
    });
  }
}

router.put("/update/:userId/:key/:value", authController.update);

router.post("/sessions", authController.sessions);

router.get("/me", checkAuthMiddleware, authController.me);

router.get("/user/:userId", authController.getUserById);

router.post("/register", authController.register);

router.post("/google", authController.register);

router.post("/apple", authController.register);

router.post("/login", authController.login);

module.exports = router;
