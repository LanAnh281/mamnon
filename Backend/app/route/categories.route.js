const express = require("express");
const router = express.Router();
const categories = require("../controller/categories.controller");

router.route("/")
    .get(categories.findAll)
    .post(categories.create)
router.route("/:id")
    .get(categories.findOne)
    .put(categories.updated)
    .delete(categories.delete);
module.exports = router;