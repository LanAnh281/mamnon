const { Accounts, Permissions } = require("../models/index");
const ApiError = require("../api-error")
const { setPassword } = require("../middleware/password.middleware");
// const { createUserAndAccount } = require("../models/transaction");
exports.create = async (req, res, next) => {
    const { name, PermissionName } = req.body;
    try {
        const permissionName = await Permission.findOne({

        })

        return res.json({ message: result, status: "success" });



    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the role'));
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const accounts = await Accounts.findAll({
            include: {
                model: Permissions,
            }
        });
        const documents = JSON.parse(JSON.stringify(accounts));
        console.log('length:', documents.length);
        for (let i = 0; i < documents.length; i++) {
            // console.log('vai trò:', documents[i].Permission["name"]);
            documents[i].positionName = documents[i].Permission["name"];
        }
        res.json({ message: documents, status: "success" });
        // return res.json({ message: documents, status: "success" });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while finding all the accounts'))
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
        console.log(account, account.dataValues["password"], passwordOld, account.dataValues["password"] == passwordOld);
        if (account && account.dataValues["password"] == passwordOld) {

            const document = await Accounts.update(
                {
                    // name: userName,
                    password: password,
                    // isActive: isActive,
                    // userId: userId,
                    // permissionId: positionId,
                },
                {
                    where: {
                        _id: _id,
                    },
                }
            );
            console.log(document);
            res.json({ message: document, status: "success" });
        } else {
            res.json({ message: "fail", status: "fail" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error, status: "faild" });
    }
};

// update active

exports.updatedActive = async (req, res, next) => {
    // const _id = req.user._id;
    // console.log(">>req.data:", req.user._id);
    let { isActive } =
        req.body;
    console.log(">>>body:", req.body);
    try {
        const document = await Accounts.update({
            isActive: isActive,
        }, { where: { _id: req.params.id } });

        return res.json({ message: document, status: "success" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error, status: "fail" });
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

