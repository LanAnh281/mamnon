const { schoolMedia } = require("../models/index");
const ApiError = require("../api-error")
exports.create = async (req, res, next) => {
    const { name } = req.body;
    console.log("School Body:", req.body);
    try {
        const document = await schoolMedia.create({
            name: name,
        });
        console.log(document);
        return res.json({ message: document, status: "success" });
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