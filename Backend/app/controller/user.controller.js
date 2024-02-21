const { Users, certification, Accounts, Permissions } = require("../models/index");
const ApiError = require("../api-error");
const fs = require("fs");
const path = require("path");
const uploadDir = "./uploads/images";

const setPassword = () => {
    const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};
exports.create = async (req, res, next) => {
    const { name, birthday, gender, identification, address, email, phone, positionName, nameCertification } = req.body;
    console.log("user Body:", req.body);
    const { avatar, files } = req.files;
    console.log("File:", req.files)
    console.log("IMG:", avatar[0].filename, files[0].filename, files[1].filename);
    try {
        let document = '';
        const permission = await Permissions.findOne({
            where: {
                name: positionName
            }
        })

        if (positionName == 'giáo viên') {
            console.log('--------Giáo viên');
            document = await Users.create({
                name: name,
                birthday: birthday,
                gender: gender,
                identification: identification,
                address: address,
                email: email,
                phone: phone,
                imagePrevious: files[0].originalname,
                imageAfter: files[1].originalname,
                image: avatar[0].originalname,
                positionName: positionName
            });
            // chứng chỉ
            const documentCer = await certification.create({
                name: nameCertification,
                userId: document._id
            })
        }
        //phụ huynh
        else {
            console.log('--------Phụ huynh');
            document = await Users.create({
                name: name,
                birthday: birthday,
                gender: gender,
                identification: identification,
                address: address,
                email: email,
                phone: phone,
                positionName: positionName
            });
        }
        console.log("BAC:", document);
        // tạo tài khoản
        let password = setPassword();
        const newAccount = await Accounts.create({
            name: phone,
            password: password,
            isActive: true,
            userId: document._id,
            permissionId: permission._id
        })
        console.log("ACC:", newAccount);
        document.dataValues['password'] = newAccount.password;
        return res.json({ message: document, status: "success" });
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

