const { programs, grade } = require("../models/index");
const ApiError = require("../api-error")
exports.create = async (req, res, next) => {
    const { name, content, gradeId, courseId } = req.body;
    console.log("programs Body:", req.body);
    try {
        const document = await programs.create({
            name: name,
            content: content,
            gradeId: gradeId,
            courseId: courseId,

        });
        console.log(document);
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the program'))
    }
};
exports.find = async (req, res, next) => {
    try {
        const documents = await programs.findAll({});
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding all the program'))
    }
};

exports.updated = async (req, res, next) => {
    const { name, content, gradeId, courseId } = req.body;
    console.log("Update programs", req.body);
    try {
        const document = await programs.update(
            {
                name: name,
                content: content,
                gradeId: gradeId,
                courseId: courseId,
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
        return next(new ApiError(500, 'An error occurred while updating the program'))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const document = await programs.destroy({
            where: {
                _id: req.params.id
            }
        })
        return res.json({ message: document, status: "Success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while delete the program'))
    }
}
