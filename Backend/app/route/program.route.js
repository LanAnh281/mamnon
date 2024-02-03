const express = require("express");
const router = express.Router();
const programs = require("../controller/program.controller");

router.route("/")
    .get(programs.find)
    .post(programs.create)

router.route("/:id")
    .put(programs.updated)
    .delete(programs.delete)

module.exports = router;