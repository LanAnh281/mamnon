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

const Positions = sequelize.define("Positions", {
  _id: setPrimary,
  name: {
    type: DataTypes.TEXT,
    allowNull: false,

  },
});
const Roles_Positions = sequelize.define("Roles_Positions", {});

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



// checked
//many-to-many relationship
Roles.belongsToMany(Positions, {
  through: Roles_Positions,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Positions.belongsToMany(Roles, {
  through: Roles_Positions,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
// one-to-many relationship
Positions.hasMany(Accounts, {
  foreignKey: "positionId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Accounts.belongsTo(Positions, {
  foreignKey: "positionId",
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





// Sync the model with the database
Roles.sync();
Positions.sync();
Roles_Positions.sync();
Accounts.sync();
Users.sync();


module.exports = {
  Roles,
  Positions,
  Roles_Positions,
  Accounts,
  Users,

};
