const express = require("express");
const router = express.Router();
const paypal = require("../controller/paypal.controller");
const authorization = require("../middleware/authorization.middeware");

router
    .route("/")
    .get(paypal.hien)
    .post(
        paypal.taopaypal
    );

router.route("/success").get(paypal.thanhcong);
router.route("/cancel").get(paypal.thatbai);

module.exports = router;