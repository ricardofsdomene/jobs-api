const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.get("/:id/following", function (req, res) {
    userController.getFollowing;
});

router.get("/users", userController.getUsers);

module.exports = router;
