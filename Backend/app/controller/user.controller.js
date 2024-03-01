const { Users, certification, Accounts, Permissions, daily } = require("../models/index");
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
    const { name, birthday, gender, identification, address, email, phone, positionName, nameCertification, selectedPermission } = req.body;
    const { avatar, files } = req.files;
    console.log("File:", req.files)
    console.log("IMG:", avatar[0].filename, files[0].filename, files[1].filename);
    try {

        // const permission = await Permissions.findOne({
        //     where: {
        //         name: positionName
        //     }
        // })
        const document = await Users.create({
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

        console.log("BAC:", document);
        // tạo tài khoản
        let password = setPassword();
        const newAccount = await Accounts.create({
            name: phone,
            password: password,
            isActive: true,
            userId: document._id,
            permissionId: selectedPermission
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
        const documents = await Users.findAll({});
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding all the role'))
    }
};
exports.findOne = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const document = await Users.findOne({
            where: {
                _id: req.params.id,
            },
            include: [{
                model: certification,

            }, {
                model: Accounts,
                include: {
                    model: Permissions
                }
            }]
            // include: {

            // }


        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding  the role'))
    }
};
exports.updated = async (req, res, next) => {
    const { name, birthday, gender, identification, address, email, phone, positionName, nameCertification, image, imageAfter, imagePrevious, remove } = req.body;
    console.log(req.body);
    const { avatar, files } = req.files;
    console.log("File:", req.files)
    // console.log("IMG:", avatar[0].filename, files[0].filename, files[1].filename);
    try {
        const documentUser = await Users.update(
            {
                name: name,
                birthday: birthday,
                gender: gender,
                identification: identification,
                address: address,
                email: email,
                phone: phone,
            },
            {
                where: {
                    _id: req.params.id,
                },
            }
        );
        const documentCer = await certification.update(
            {
                name: nameCertification,
                userId: req.params.id
            },
            {
                where: {
                    userId: req.params.id
                }
            })
        // có chỉnh sửa cả cccd và chân dung
        if (Object.keys(req.files).length != 0) {
            console.log(files, files == undefined);
            if (files != undefined && avatar != undefined) {
                const document = await Users.update(
                    {
                        imagePrevious: files[0].originalname,
                        imageAfter: files[1].originalname,
                        image: avatar[0].originalname,
                    },
                    {
                        where: {
                            _id: req.params.id,
                        },
                    }
                );

                // xóa đi cccd và avatar trên thư mục uploads/images 

                for (let media of remove) {
                    console.log('media', media);
                    let filePath = `${uploadDir}/${media}`;
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath); //delete file
                        console.log(">>>Destroy:");
                    }
                }

            }
            // chỉnh sửa cccd 
            else if (files != undefined) {
                if (files[0].filename && files[1].filename) {
                    const document = await Users.update(
                        {
                            imagePrevious: files[0].originalname,
                            imageAfter: files[1].originalname,
                        },
                        {
                            where: {
                                _id: req.params.id,
                            },
                        }
                    );
                    for (let media of remove) {
                        console.log('media', media);
                        let filePath = `${uploadDir}/${media}`;
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath); //delete file
                            console.log(">>>Destroy:");
                        }
                    }
                }

            } else if (avatar != undefined) {
                console.log('cập nhật avatar');
                if (avatar[0].filename) {
                    const document = await Users.update(
                        {
                            image: avatar[0].originalname,
                        },
                        {
                            where: {
                                _id: req.params.id,
                            },
                        }
                    );
                    let filePath = `${uploadDir}/${remove}`;
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath); //delete file
                        console.log(">>>Destroy:");
                    }

                }

            }

        }
        return res.json({ message: documentUser, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while updating the user'))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const documentUser = await Users.findOne({
            where: {
                _id: req.params.id,
            }
        });
        console.log(documentUser);
        let fileAvatar = `${uploadDir}/${documentUser.dataValues['image']}`;
        if (fs.existsSync(fileAvatar)) {
            fs.unlinkSync(fileAvatar); //delete file
            console.log(">>>Destroy:");
        }
        let fileImageAfter = `${uploadDir}/${documentUser.dataValues['imageAfter']}`;
        if (fs.existsSync(fileImageAfter)) {
            fs.unlinkSync(fileImageAfter); //delete file
            console.log(">>>Destroy:");
        }
        let fileImagePrevious = `${uploadDir}/${documentUser.dataValues['imagePrevious']}`;
        if (fs.existsSync(fileImagePrevious)) {
            fs.unlinkSync(fileImagePrevious); //delete file
            console.log(">>>Destroy:");
        }
        const document = await Users.destroy({
            where: {
                _id: req.params.id,
            },
        });


        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while deleting the user'))
    }
};

// get image
exports.getImg = async function (req, res) {
    const imagePath = path.join(
        __dirname,
        "..",
        "..",
        "/uploads/images",
        `${req.params.id}`
    );
    res.sendFile(imagePath);
};

