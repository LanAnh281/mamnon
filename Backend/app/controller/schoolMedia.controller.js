const { schoolMedia } = require("../models/index");
const ApiError = require("../api-error");
const fs = require("fs");
const path = require("path");
const uploadDir = "./static/images";
exports.create = async (req, res, next) => {
    const { schoolId } = req.body;
    console.log("File:", req.files, req.files.length)
    // console.log("School Body:", req.body, req.files);
    try {
        let flag = false;
        console.log(req.files.length);
        for (let i = 0; i < req.files.length; i++) {
            console.log("Name:", req.files[i].filename);
            const document = await schoolMedia.create({
                name: req.files[i].filename,
                schoolId: schoolId
            });
            flag = true;
        }

        console.log(flag);
        return res.json({ message: flag, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the media school'))
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const documents = await schoolMedia.findAll({});
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding all the media school'))
    }
};

exports.delete = async (req, res, next) => {
    try {
        const image = await schoolMedia.findOne({
            where: {
                _id: req.params.id
            }
        })
        let fileImage = `${uploadDir}/${image.name}`;
        console.log("F:", fileImage);
        if (fs.existsSync(fileImage)) {
            fs.unlinkSync(fileImage); //delete file
            console.log(">>>Destroy:");
        }
        const document = await schoolMedia.destroy({
            where: {
                _id: req.params.id,
            },
        });

        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while deleting the media school'))
    }
};