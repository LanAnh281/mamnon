const express = require("express");
const router = express.Router();
const grade = require("../controller/grade.controller");

router.route("/")
    .get(grade.findAll)
    .post(grade.create)
router.route("/:id")
    .get(grade.findOne)
    .put(grade.updated)
    .delete(grade.delete);
router.route("/class/:id")
    .get(grade.findAllClass);
module.exports = router;