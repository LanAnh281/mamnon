const { School } = require("../models/index");
const ApiError = require("../api-error")
exports.create = async (req, res, next) => {
    const { name, address, phone, TaxId, clientId, secretId, email } = req.body;
    console.log("School Body:", req.body);
    try {
        const document = await School.create({
            name: name,
            address: address,
            phone: phone,
            TaxId: TaxId,
            clientId: clientId,
            secretId: secretId,
            email: email

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
        const documents = await School.findAll({});
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding all the role'))
    }
};
exports.findOne = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const document = await School.findOne({
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
    const { name, address, phone, TaxId, clientId, secretId, email } = req.body; console.log("Update School", req.body);
    try {
        const document = await School.update(
            {
                name: name,
                address: address,
                phone: phone,
                TaxId: TaxId,
                clientId: clientId,
                secretId: secretId,
                email: email

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

