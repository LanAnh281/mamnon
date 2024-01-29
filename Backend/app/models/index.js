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
  name: {
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
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Họ tên người dùng không được bỏ trống.",
      },
    },
  },
  birthday: { type: DataTypes.DATE },
  gender: { type: DataTypes.BOOLEAN },
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
  image: {
    type: DataTypes.TEXT
  }

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
  },
  logan: {
    type: DataTypes.TEXT
  },
  information: {
    type: DataTypes.TEXT
  }

});
const schoolMedia = sequelize.define("schoolMedia", {
  _id: setPrimary,
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
const food = sequelize.define("food", {
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
const daily = sequelize.define("daily", {
  _id: setPrimary,
  date: {
    type: DataTypes.DATE,
  },
  day: {
    type: DataTypes.STRING
  }
})
const menuDaily = sequelize.define("menuDaily", {

});
const grade = sequelize.define("grade", {
  _id: setPrimary,
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT
  }

})
const course = sequelize.define("course", {
  _id: setPrimary,
  name: {
    type: DataTypes.STRING,
  },
  start: {
    type: DataTypes.STRING
  },
  end: {
    type: DataTypes.STRING
  }
})
const classRoom = sequelize.define("classRoom", {
  _id: setPrimary,
  name: {
    type: DataTypes.STRING,
  },
})
const BMI = sequelize.define("BMI", {
  _id: setPrimary,
  weight: {
    type: DataTypes.INTEGER,
  },
  height: {
    type: DataTypes.INTEGER,
  },
  type: {
    type: DataTypes.STRING,
  },
  BMI: {
    type: DataTypes.FLOAT
  }
})
const certification = sequelize.define("certification", {
  _id: setPrimary,
  issuedate: {
    type: DataTypes.DATE,
  },
  imagePrevious: {
    type: DataTypes.STRING,
  },
  imageAfter: {
    type: DataTypes.STRING
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
Categories.hasOne(food, {
  foreignKey: "categoriesId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE"
})
food.belongsTo(Categories, {
  foreignKey: "categoriesId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE"
})
food.belongsToMany(daily, {
  through: menuDaily,
  onUpdate: "CASCADE",
  onDelete: "CASCADE"
})
daily.belongsToMany(food, {
  through: menuDaily,
  onUpdate: "CASCADE",
  onDelete: "CASCADE"
})
grade.hasMany(classRoom);
course.hasMany(classRoom);

Users.hasMany(certification, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
certification.belongsTo(Users, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
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
food.sync();
daily.sync();
menuDaily.sync();
grade.sync();
course.sync();
classRoom.sync();
BMI.sync();
certification.sync();
module.exports = {
  Roles,
  Permissions,
  rolePermission,
  Accounts,
  Users,
  Categories,
  School,
  schoolMedia,
  food,
  daily,
  menuDaily,
  grade,
  course,
  classRoom,
  BMI,
  certification
};
