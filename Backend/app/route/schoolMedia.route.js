const express = require("express");
const router = express.Router();
const schoolMedia = require("../controller/schoolMedia.controller");

router.route("/")
    .get(schoolMedia.findAll)
    .post(schoolMedia.create)

router.route("/:id")
    .delete(schoolMedia.delete)


module.exports = router;