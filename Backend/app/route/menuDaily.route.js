const express = require("express");
const router = express.Router();
const menuDaily = require("../controller/menuDaily.controller");

router.route("/")
    .get(menuDaily.findAll)
    .post(menuDaily.create)
router.route("/:id")
    .get(menuDaily.findOne)
    .put(menuDaily.updated)
    .delete(menuDaily.delete);
module.exports = router;