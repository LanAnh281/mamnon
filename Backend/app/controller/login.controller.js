const { Accounts, Permissions, Users } = require("../models/index");
const ApiError = require("../api-error")
const jwt = require("jsonwebtoken");
const secret = "asdfghjkl!@#";
const uuid = require("uuid");
const crypto = require("crypto");
const encryptionKey = "12345678912345678901234567890121";
const iv = "0123456789abcdef";

// const moment = require("moment");
const moment = require("moment-timezone");

const setEncrypt = (value) => {
    const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
    let encrypted = cipher.update(value, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};
const getDecrypt = (name) => {
    if (name) {
        const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
        let decrypted = decipher.update(name, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
};


exports.login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        console.log(req.body);
        const document = await Accounts.findOne({
            where: {
                name: userName,
                password: password
            }
        });
        if (!document) {
            return res.json({ message: "fail", status: "fail" });
        }
        if (document["isActive"]) {
            const permission = await Permissions.findOne({
                where: { _id: document["permissionId"] },
            });

            console.log("userId:", document["userId"]);
            const documentUser =
                document["userId"] != null && document["userId"] != undefined
                    ? await Users.findOne({
                        where: { _id: document["userId"] },
                    })
                    : { userName: "Quản trị viên" };
            console.log("*****USER:", documentUser);

            const refreshToken = uuid.v4(); // string  refresh token unique
            let refreshTokenExprityTime = moment();

            refreshTokenExprityTime = refreshTokenExprityTime.add(24, "hours"); // add 2 hours

            const updated = await Accounts.update(
                {
                    refreshToken: refreshToken,
                    refreshTokenExprityTime: refreshTokenExprityTime,
                },
                { where: { _id: document["_id"] } }
            );
            //set cookie at client-side
            res.cookie("refreshToken", refreshToken, {
                expires: refreshTokenExprityTime.toDate(), //
                httpOnly: true,
                secure: true,
            });
            //jwt
            const expiresInMinutes = 3; // Thời gian tồn tại của JWT (vd: 1 phút)
            const expiryTime = moment().add(expiresInMinutes, "hours");
            jwt.sign(
                {
                    _id: document["_id"],
                    userId: document["userId"],
                    permission: permission,
                    exp: expiryTime.unix(),
                },
                secret,
                function (err, data) {
                    return res.send({
                        message: "success",
                        status: "success",
                        token: data,
                        permissionName: permission["name"],
                        userName: documentUser["userName"],
                        expiresIn: expiryTime,
                    });
                }
            );
        } else {
            return res.json({ message: "fail", status: "fail" });
        }
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while login'))
    }
}