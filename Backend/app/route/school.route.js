const express = require("express");
const router = express.Router();
const school = require("../controller/school.controller");

router.route("/")
    .get(school.find)
    .post(school.create)

router.route("/:id")
    .put(school.updated)

module.exports = router;