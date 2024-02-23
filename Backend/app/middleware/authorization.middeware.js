const { Roles, rolePermission } = require("../models/index");
const jwt = require("jsonwebtoken");
const secret = "asdfghjkl!@#";

// Middleware xác thực
exports.authentication = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            return res
                .status(401)
                .json({ message: "Token not provided", status: "fail" });
        }
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res
                    .status(401)
                    .json({ message: "Invalid token", status: "fail" });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.json({ message: error, status: "fail" });
    }
};

// Middleware xác định quyền
exports.authorization = (requiredPermission) => {
    return async (req, res, next) => {
        const { user } = req;
        console.log("user", user);
        if (!user) {
            return res.status(403).json({ message: "Access denied" });
        }
        const role_position = await findByRoleName(
            user.permission["_id"],
            requiredPermission
        );
        if (!role_position) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};
const findByRoleName = async (position, name) => {
    try {
        console.log('Name:', name);
        const document = await Roles.findOne({ where: { name: name } });
        if (!document)
            return { message: "Access denied" };
        const role_position = await rolePermission.findOne({
            where: {
                positionId: position,
                RoleId: document["_id"],
            },
        });
        return role_position;
    } catch (error) {
        return { message: "Access denied", status: "fail" };
    }
};