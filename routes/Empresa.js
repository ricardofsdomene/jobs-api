const express = require("express");
const router = express.Router();

const empresaController = require("../controller/empresa");

router.post("/", empresaController.create);

router.get("/empresas", empresaController.get);

router.delete("/:_id", empresaController.delete);

module.exports = router;
