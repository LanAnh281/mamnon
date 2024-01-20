const express = require("express");
const router = express.Router();
const daily = require("../controller/daily.controller");

router.route("/")
    .get(role.findAll)
    .post(role.create)
    .delete(role.deleteAll);
router.route("/:id")
    .get(role.findOne)
    .put(role.updated)
    .delete(role.delete);
module.exports = router;