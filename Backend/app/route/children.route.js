const express = require("express");
const router = express.Router();
const children = require("../controller/children.controller");

router.route("/")
    .get(children.findAll)
    .post(children.create)
router.route("/:id")
    .get(children.findOne)
    .put(children.updated)
    .delete(children.delete);
module.exports = router;