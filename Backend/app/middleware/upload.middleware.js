const multer = require("multer");
const _ = require("lodash");
const path = require("path");
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Wrong file type");
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: "./uploads/images",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        // const fileExtension = path.extname(file.originalname);
        console.log("Name1:", file.fieldname);
        cb(null, file.originalname
            // + "-"
            // + uniqueSuffix
            // + fileExtension
        );
    },
});
const storageStatic = multer.diskStorage({
    destination: "./static/images",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    },
});
const MAX_SIZE = 100000000; //100mb

exports.uploadStatic = multer({
    storage: storageStatic,
    fileFilter: fileFilter,
    limits: {
        fileSize: MAX_SIZE,
    },
});

exports.upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: MAX_SIZE,
    },
});