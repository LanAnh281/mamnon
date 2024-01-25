const { BMI } = require("../models/index");
const ApiError = require("../api-error")
exports.create = async (req, res, next) => {
    const { name, start, end } = req.body;
    console.log("BMI Body:", req.body);
    try {
        const document = await BMI.create({
            name: name,
            start: start,
            end: end
        });
        console.log(document);
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the role'))
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const documents = await BMI.findAll({});
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding all the role'))
    }
};

exports.updated = async (req, res, next) => {
    const { name, start, end } = req.body;
    console.log("Update BMI", req.body);
    try {
        const document = await BMI.update(
            {
                name: name,
                start: start,
                end: end
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
        return next(new ApiError(500, 'An error occurred while updating the role'))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const document = await BMI.destroy({
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

