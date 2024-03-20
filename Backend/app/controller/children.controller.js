const { children } = require("../models/index");
const ApiError = require("../api-error")
exports.create = async (req, res, next) => {
    const { name, birthday, gender,oldBMI, newBMI,  classRoomId, userId,relationship } = req.body;
    console.log("children Body:", req.body);
    try {
        const document = await children.create({
            name: name,
            birthday: birthday,
            gender: gender, 
            classRoomId: classRoomId, 
            userId: userId,
            oldBMI:'',
            newBMI:'',
            relationship:relationship,
            active:true,
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
        const documents = await children.findAll({});
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding all the role'))
    }
};
exports.findOne = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const document = await children.findOne({
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
    console.log("Update children", req.body);
    try {
        const document = await children.update(
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
        const document = await children.destroy({
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
        const documents = await children.destroy({
            where: {}
        });
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while deleting all the role'))
    }
};
