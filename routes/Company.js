const express = require("express");
const router = express.Router();

const companyController = require("../controller/company");

router.post("/", companyController.company);
router.get("/companies", companyController.companies)
// router.get("/:id", companyController.get)

router.get("/:companyId", companyController.getById)

module.exports = router;
