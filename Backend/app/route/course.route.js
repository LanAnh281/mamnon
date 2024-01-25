const express = require("express");
const router = express.Router();
const course = require("../controller/course.controller");

router.route("/")
    .get(course.findAll)
    .post(course.create)
router.route("/:id")
    .get(course.findOne)
    .put(course.updated)
    .delete(course.delete);
module.exports = router;