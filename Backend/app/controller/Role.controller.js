const { role } = require("../models/index");
const { ApiError } = require("../api-error");
exports.create = async (req, res, next) => {
  try {
    console.log("Body", req.body);
    const newRole = role({
      name: req.body.name,
    });
    const document = await newRole.save();
    console.log("doc:", document);
    return res.json({ data: document, status: "success" });
  } catch (error) {
    return next(ApiError(500, "An error occurred while creating the role"));
  }
};
exports.findAll = async (req, res, next) => {
  try {
    const document = await role.find({});
    console.log("doc:", document);
    return res.json({ data: document, status: "success" });
  } catch (error) {
    return next(ApiError(500, "An error occurred while creating the role"));
  }
};

exports.find = async (req, res, next) => {
  try {
    const document = await role.findOne({ _id: req.params._id });
    console.log("doc:", document);
    return res.json({ data: document, status: "success" });
  } catch (error) {
    return next(ApiError(500, "An error occurred while creating the role"));
  }
};
exports.deleteAll = async (req, res, next) => {
  try {
  } catch (error) {
    return next(ApiError(500, "An error occurred while creating the role"));
  }
};
