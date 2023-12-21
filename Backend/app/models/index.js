const { mongoose } = require("../config/index");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 100 },
  },
  {
    timestamps: true, // Thêm createdAt và updatedAt
  }
);
const role = mongoose.model("Role", roleSchema);
const permissionSchema = new mongoose.Schema({
  name: String,
});
const permission = mongoose.model("Permission", permissionSchema);
const rolePermissionSchema = mongoose.Schema({
  roleId: { type: ObjectId, ref: "Role" },
  permissionId: { type: ObjectId, ref: "Permission" },
});
const rolePermission = new mongoose.model(
  "RolePermission",
  rolePermissionSchema
);
module.exports = {
  role,
  permission,
  rolePermission,
};
