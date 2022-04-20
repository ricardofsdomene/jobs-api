const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.get("/", function (req, res) {
    userController.hi
})

router.get("/:id/following", function (req, res) {
    userController.getFollowing;
});

module.exports = router;
