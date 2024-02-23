const { Accounts } = require("../models/index");
const ApiError = require("../api-error")
const { setPassword } = require("../middleware/password.middleware");
// const { createUserAndAccount } = require("../models/transaction");
exports.create = async (req, res, next) => {
    const { name } = req.body;
    try {
        let {
            name, birthday, gender,
            identification, address, email,
            phone, image, imageAfter, imagePrevious,
            file,
        } = req.body;
        const password = setPassword();
        // file image
        try {
            fs.readdir(uploadDir, async (err, files) => {
                if (err) {
                    console.error("Error reading upload directory:", err);
                    return;
                }
                let newestFiles = [];
                if (files[0] != "") {
                    //sort the file list by time (using mtime)
                    // sort in descending order-
                    files.sort((file1, file2) => {
                        const stat1 = fs.statSync(path.join(uploadDir, file1));
                        const stat2 = fs.statSync(path.join(uploadDir, file2));
                        return stat2.mtime - stat1.mtime;
                    });

                    // Retrieve the two most recent files.
                    newestFiles = files.slice(0, 2);
                } else {
                    newestFiles = [...file];
                }
                //
                const result = await createUserAndAccount(req.body);
                return res.json({ message: result, status: "success" });
            });
        }
        catch (error) {
            return next(new ApiError(500, 'An error occurred while creating the role'));
        }
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the role'));
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const documents = await Accounts.findAll({});
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while finding all the role'))
    }
};
exports.findOne = async (req, res, next) => {
    try {
        const document = await Accounts.findAll({
            where: {
                _id: req.params.id,
            },
            include: [{
                model: foodList,
            }]
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while finding  the role'))
    }
};
exports.updated = async (req, res, next) => {
    const _id = req.user._id;
    console.log(">>req.data:", req.user._id);
    let { userName, passwordOld, password, userId, positionId, isActive } =
        req.body;
    console.log(">>>body:", req.body);
    try {
        const account = await Accounts.findOne({ where: { _id: _id } });
        if (account && account["password"] === passwordOld) {
            password = password;
            const document = await Accounts.update(
                {
                    userName: userName,
                    password: password,
                    isActive: isActive,
                    userId: userId,
                    positionId: positionId,
                },
                {
                    where: {
                        _id: _id,
                    },
                }
            );
            res.json({ message: document, status: "success" });
        } else {
            res.json({ message: "fail", status: "fail" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error, status: "faild" });
    }
};
exports.delete = async (req, res, next) => {
    try {
        const document = await Accounts.destroy({
            where: {
                _id: req.params.id,
            },
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while deleting the role'))
    }
};

