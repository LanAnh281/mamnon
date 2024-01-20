const { DataTypes, Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../config/index");

const setPrimary = {
  type: DataTypes.STRING,
  defaultValue: () => uuidv4(), // create string unique
  primaryKey: true,
};

// Models
const Roles = sequelize.define("Roles", {
  _id: setPrimary,
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Tên quyền  không được bỏ trống.",
      },
    },
  },
});

const Permissions = sequelize.define("Permissions", {
  _id: setPrimary,
  name: {
    type: DataTypes.TEXT,
    allowNull: false,

  },
});
const rolePermission = sequelize.define("rolePermission", {});

const Accounts = sequelize.define("Accounts", {
  _id: setPrimary,
  userName: {
    type: DataTypes.TEXT,
    allowNull: false,

  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
  refreshToken: {
    type: DataTypes.STRING,
  },
  refreshTokenExprityTime: {
    type: DataTypes.DATE,
  },
});
const Users = sequelize.define("Users", {
  _id: setPrimary,
  userName: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Họ tên người dùng không được bỏ trống.",
      },
    },
  },
  birthday: { type: DataTypes.DATE },
  sex: { type: DataTypes.BOOLEAN },
  identification: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,

  },
  phone: {
    type: DataTypes.STRING,
  },
  imagePrevious: {
    type: DataTypes.TEXT,
  },
  imageAfter: {
    type: DataTypes.TEXT,
  },

});

const Categories = sequelize.define("Categories", {
  _id: setPrimary,
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
const School = sequelize.define("School", {
  _id: setPrimary,
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,

  },
  clientId: {
    type: DataTypes.TEXT,
  },
  secretId: {
    type: DataTypes.TEXT,
  },
  TAXID: {
    type: DataTypes.STRING,
  }

});
const schoolMedia = sequelize.define("schoolMedia", {
  _id: setPrimary,
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
const foodList = sequelize.define("foodList", {
  _id: setPrimary,
  name: {
    type: DataTypes.STRING,
  },
  material: {
    type: DataTypes.TEXT,
  },
  quanity: {
    type: DataTypes.INTEGER,
  }
})
// checked
//many-to-many relationship
Roles.belongsToMany(Permissions, {
  through: rolePermission,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Permissions.belongsToMany(Roles, {
  through: rolePermission,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
// one-to-many relationship
Permissions.hasMany(Accounts, {
  foreignKey: "permisionId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Accounts.belongsTo(Permissions, {
  foreignKey: "permissionId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
//one-to-one relationship
Users.hasOne(Accounts, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Accounts.belongsTo(Users, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

School.hasMany(schoolMedia, {
  foreignKey: "schoolId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
schoolMedia.belongsTo(School, {
  foreignKey: "schoolId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
Categories.hasOne(foodList, {
  foreignKey: "categoriesId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE"
})
foodList.belongsTo(Categories, {
  foreignKey: "categoriesId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE"
})
// Sync the model with the database
Roles.sync();
Permissions.sync();
rolePermission.sync();
Accounts.sync();
Users.sync();
Categories.sync();
School.sync();
schoolMedia.sync();
foodList.sync();

module.exports = {
  Roles,
  Permissions,
  rolePermission,
  Accounts,
  Users,
  Categories,
  School,
  schoolMedia,
  foodList
};
