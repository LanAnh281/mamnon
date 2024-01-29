const { food } = require("../models/index");
const ApiError = require("../api-error")
exports.create = async (req, res, next) => {
    const { name, material, quanity, categoriesId } = req.body;
    try {
        const document = await food.create({
            name: name,
            material: material,
            quanity: quanity,
            categoriesId: categoriesId
        });
        console.log(document);
        return res.json({ message: document, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the food'))
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const document = await food.findAll();
        return res.json({ message: document, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while updating the food'))
    }
}

exports.updated = async (req, res, next) => {
    const { name, material, quanity, categoriesId } = req.body;
    console.log("Update food", req.body);
    try {
        const document = await food.update(
            {
                name: name,
                material: material,
                quanity: quanity,
                categoriesId: categoriesId
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
        return next(new ApiError(500, 'An error occurred while updating the food'))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const document = await food.destroy({
            where: {
                _id: req.params.id,
            },
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while deleting the food'))
    }
};

