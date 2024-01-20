const express = require("express");
const router = express.Router();
const permission = require("../controller/permission.controller");

router.route("/")
    .get(permission.findAll)
    .post(permission.create)
    .delete(permission.deleteAll);
router.route("/:id")
    .get(permission.findOne)
    .put(permission.updated)
    .delete(permission.delete);
module.exports = router;