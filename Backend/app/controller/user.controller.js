const { Users } = require("../models/index");
const ApiError = require("../api-error")
exports.create = async (req, res, next) => {
    const { name, birthday, gender, identification, address, email, phone, positionName } = req.body;
    console.log("user Body:", req.body);
    const { avatar, files } = req.files;
    console.log("File:", req.files)
    console.log("IMG:", avatar[0].filename, files[0].filename, files[1].filename);
    try {

        // name image
        fs.readdir(uploadDir, async (error, files) => {
            if (error) {
                console.error("Error reading upload directory:", error);
                return;
            }
            let newestFiles = [];

            //sort the file list by time (using mtime)
            // sort in descending order-
            files.sort((file1, file2) => {
                const stat1 = fs.statSync(path.join(uploadDir, file1));
                const stat2 = fs.statSync(path.join(uploadDir, file2));
                return stat2.mtime - stat1.mtime;
            });

            newestFiles = files.slice(0, 3);
            console.log("new files:", newestFiles);
        })
        // const document = await classRoom.create({
        //     name: name,
        //     birthday: birthday,
        //     gender: gender,
        //     identification: identification,
        //     address: address,
        //     email: email,
        //     phone: phone,
        //     imagePrevious: imagePrevious,
        //     imageAfter: imageAfter,
        //     image: image, positionName: positionName
        // });
        // console.log(document);
        return res.json({ message: 'abc', status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the role'))
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const documents = await classRoom.findAll({});
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding all the role'))
    }
};
exports.findOne = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const document = await classRoom.findOne({
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
    const { name, gradeId, courseId } = req.body;
    console.log("Update classRoom", req.body);
    try {
        const document = await classRoom.update(
            {
                name: name,
                gradeId: gradeId,
                courseId: courseId
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
        const document = await classRoom.destroy({
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

