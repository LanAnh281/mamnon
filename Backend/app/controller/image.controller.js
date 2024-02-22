const fs = require("fs");
const uploadDir = "./uploads/images";
const path = require("path");



exports.getImg = async function (req, res) {
    const imagePath = path.join(
        __dirname,
        "..",
        "..",
        "/uploads/images",
        `${req.params.id}`
    );
    res.sendFile(imagePath);
};