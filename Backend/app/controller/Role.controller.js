const { Roles } = require("../models/index");
const ApiError = require("../api-error")
exports.create = async (req, res, next) => {
  const { name } = req.body;
  console.log("Roles Body:", req.body);
  try {
    const document = await Roles.create({
      name: name,
    });
    console.log(document);
    return res.json({ message: document, status: "success" });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, 'An error occurred while creating the role'))
  }
};
exports.findAll = async (req, res, next) => {
  try {
    const documents = await Roles.findAll({});
    return res.json({ message: documents, status: "success" });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, 'An error occurred while finding all the role'))
  }
};
exports.findOne = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const document = await Roles.findOne({
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
  const { name } = req.body;
  console.log("Update Roles", req.body);
  try {
    const document = await Roles.update(
      {
        name: name,
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
    const document = await Roles.destroy({
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
exports.deleteAll = async (req, res, next) => {
  try {
    const documents = await Roles.destroy({
      where: {}
    });
    return res.json({ message: documents, status: "success" });
  } catch (error) {
    return next(new ApiError(500, 'An error occurred while deleting all the role'))
  }
};
