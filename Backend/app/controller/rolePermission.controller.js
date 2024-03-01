const { Roles, Permissions, rolePermission } = require("../models/index");
const ApiError = require("../api-error")
// create a permission_role POST
exports.create = async (req, res, next) => {
    const { RoleId, PermissionId } = req.body;
    console.log("rolePermission Body:", req.body);
    try {
        const document = await rolePermission.create({
            RoleId: RoleId,
            PermissionId: PermissionId,
        });
        console.log(document);
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the role'))
    }
};

// delete a permission_role PUT
exports.delete = async (req, res, next) => {
    try {
        const document = await rolePermission.destroy({
            where: {
                RoleId: req.body.roleId,
                PermissionId: req.body.permissionId
            },
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while deleting the role'))
    }
};
// find one roles of a permission
// id:permissionID  GET
exports.findOne = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const document = await rolePermission.findAll({
            where: {
                PermissionId: req.params.id,
            },
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding  the role'))
    }
};
// find all roles of all permissions GET
exports.findAll = async (req, res, next) => {
    try {
        const documents = await rolePermission.findAll({
            where: {
                PermissionId: req.params.id,
            },
        });
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding all the role'))
    }
};
//
exports.deleteOne = async (req, res, next) => {
    const { RoleId, PermissionId } = req.body;
    try {
        const document = await rolePermission.destroy({
            where: {
                RoleId: RoleId,
                PermissionId: PermissionId,
            },
        });
        res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        res.json({ message: error, status: "faild" });
    }
}
