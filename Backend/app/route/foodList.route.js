const express = require("express");
const router = express.Router();
const foodList = require("../controller/foodList.controller");

router.route("/")
    .post(foodList.create)
router.route("/:id")
    .put(foodList.updated)
    .delete(foodList.delete);
module.exports = router;