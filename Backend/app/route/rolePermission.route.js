const express = require("express");
const router = express.Router();
const rolePermission = require("../controller/rolePermission.controller");

router.route("/")
    .get(rolePermission.findAll)
    .post(rolePermission.create)
    .put(rolePermission.delete);// because delete Method not body so use put
router.route("/:id") // id : a permission
    .get(rolePermission.findOne);

module.exports = router;