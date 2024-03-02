const express = require("express");
const router = express.Router();
const schoolMedia = require("../controller/schoolMedia.controller");
const upload = require("../middleware/upload.middleware");

router.route("/")
    .get(schoolMedia.findAll)
    .post(
        upload.uploadStatic.array("files"),
        schoolMedia.create)
router.route("/:id")
    .delete(schoolMedia.delete)


module.exports = router;