const express = require("express");
const router = express.Router();
const user = require("../controller/user.controller");
const upload = require("../middleware/upload.middleware");

router.route("/")
    .get(user.findAll)
    .post(
        upload.upload.fields([
            { name: "avatar", maxCount: 2 },
            { name: "files", maxCount: 2 }
        ]),
        user.create)
router.route("/:id")
    .get(user.findOne)
    .put(upload.upload.fields([
        { name: "avatar", maxCount: 2 },
        { name: "files", maxCount: 2 }
    ]), user.updated)
    .delete(user.delete);
router.route("/getImg/:id").get(user.getImg);
router.route("/parent/children")    
    .post( user.createParent);
router.route("/parent/children/:id")
    .get(user.findParent)

       
module.exports = router;
