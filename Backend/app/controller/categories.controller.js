const { Categories, food } = require("../models/index");
const ApiError = require("../api-error")
exports.create = async (req, res, next) => {
    const { name } = req.body;
    try {
        const document = await Categories.create({
            name: name,
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the role'))
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const documents = await Categories.findAll({});
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while finding all the role'))
    }
};
exports.findOne = async (req, res, next) => {
    try {
        const document = await Categories.findAll({
            where: {
                _id: req.params.id,
            },
            include: [{
                model: food,
            }]
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while finding  the role'))
    }
};
exports.updated = async (req, res, next) => {
    const { name } = req.body;
    try {
        const document = await Categories.update(
            {
                name: name,
            },
            {
                where: {
                    _id: req.params.id,
                },
            }
        );
        return res.json({ message: document, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while updating the role'))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const document = await Categories.destroy({
            where: {
                _id: req.params.id,
            },
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while deleting the role'))
    }
};

