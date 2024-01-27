const { certification } = require("../models/index");
const ApiError = require("../api-error")
exports.create = async (req, res, next) => {
    const { name, issuedate, imageAfter, imagePrevious } = req.body;
    console.log("certification Body:", req.body);
    try {
        const document = await certification.create({
            name: name,
            issuedate: issuedate,
            imageAfter: imageAfter,
            imagePrevious: imagePrevious
        });
        console.log(document);
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the certification'));
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const documents = await certification.findAll({});
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding all the role'))
    }
};
exports.findOne = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const document = await certification.findOne({
            where: {
                _id: req.params.id,
            },
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding  the role'))
    }
};
exports.updated = async (req, res, next) => {
    const { name, issuedate, imageAfter, imagePrevious } = req.body;
    console.log("Update certification", req.body);
    try {
        const document = await certification.update(
            {
                name: name,
                issuedate: issuedate,
                imageAfter: imageAfter,
                imagePrevious: imagePrevious
            },
            {
                where: {
                    _id: req.params.id,
                },
            }
        );
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while updating the certification'));
    }
};
exports.delete = async (req, res, next) => {
    try {
        const document = await certification.destroy({
            where: {
                _id: req.params.id,
            },
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while deleting the role'))
    }
};

