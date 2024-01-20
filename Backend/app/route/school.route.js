const express = require("express");
const router = express.Router();
const school = require("../controller/school.controller");

router.route("/")
    .get(school.findAll)
    .post(school.create)

router.route("/:id")
    .get(school.findOne)
    .put(school.updated)

module.exports = router;