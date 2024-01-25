const express = require("express");
const router = express.Router();
const classRoom = require("../controller/classroom.controller");

router.route("/")
    .get(classRoom.findAll)
    .post(classRoom.create)
router.route("/:id")
    .get(classRoom.findOne)
    .put(classRoom.updated)
    .delete(classRoom.delete);
module.exports = router;