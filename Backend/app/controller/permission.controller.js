const { Permissions, Roles } = require("../models/index");
const ApiError = require("../api-error")
exports.create = async (req, res, next) => {
    const { name } = req.body;
    console.log("Permissions Body:", req.body);
    try {
        const document = await Permissions.create({
            name: name,
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
        const documents = await Permissions.findAll({
            include: [
                {
                    model: Roles,
                    through: {
                        attributes: [], // Bỏ qua thuộc tính của bảng trung gian (nếu bạn không muốn chúng)
                    },
                },
            ],
        });
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding all the role'))
    }
};
exports.findOne = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const document = await Permissions.findOne({
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
    const { name } = req.body;
    console.log("Update Permissions", req.body);
    try {
        const document = await Permissions.update(
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
        console.log(error);
        return next(new ApiError(500, 'An error occurred while updating the role'))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const document = await Permissions.destroy({
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
exports.deleteAll = async (req, res, next) => {
    try {
        const documents = await Permissions.destroy({
            where: {}
        });
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while deleting all the role'))
    }
};
