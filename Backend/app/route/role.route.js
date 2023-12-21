const express = require("express");
const router = express.Router();
const role = require("../controller/Role.controller");

router.route("/").get(role.findAll).post(role.create);
module.exports = router;
