const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.post("/signup", userController.register);
router.post("/login", userController.login);
router.post("/fetch", userController.fetchId);

router.get("/users", userController.fetchUsers);
router.get("/user/:_id", userController.fetchId);

module.exports = router;
