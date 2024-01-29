const { daily, menuDaily, food } = require("../models/index");
const ApiError = require("../api-error")
const { sequelize } = require("../config/index");
exports.create = async (req, res, next) => {
    const { date, day, menu } = req.body;
    try {
        const transaction = await sequelize.transaction()
        // Thêm ngày làm thực đơn
        const documentDate = await daily.create({ date: date, day: day }, { transaction });
        // thêm danh sách món ăn và thực đơn
        let status = false;
        for (const idFood of menu) {
            const document = await menuDaily.create({
                foodId: idFood,
                dailyId: documentDate._id
            }, { transaction })
        }
        await transaction.commit();
        return res.json({ message: "success", status: "success" })
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the role'))
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const documents = await daily.findAll({
            include: [{
                model: food,
                through: menuDaily

            }]
        });
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding all the role'))
    }
};
exports.findOne = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const document = await daily.findAll({
            include: [{
                model: food,
                through: menuDaily

            }],
            where: {
                _id: req.params.id
            }

        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding  the role'))
    }
};
exports.updated = async (req, res, next) => {
    const { date, day, addMenu, removeMenu } = req.body;
    console.log("Update Menu", req.body);
    try {
        const transaction = await sequelize.transaction();
        const document = await daily.update(
            {
                date: date,
                day: day
            },
            {
                where: {
                    _id: req.params.id,
                },
            }, { transaction }
        );
        // loại bỏ món ăn ra khỏi danh sách
        for (const idFood of removeMenu) {
            console.log("RV idFood: ", idFood);
            const documentDestroy = menuDaily.destroy({
                where: {
                    foodId: idFood,
                    dailyId: req.params.id,
                },
            }, { transaction })
        }
        // thêm món ăn vào danh sách
        for (const idFood of addMenu) {
            console.log("ADD idFood: ", idFood);
            const documentAdd = await menuDaily.create({
                foodId: idFood,
                dailyId: req.params.id
            }, { transaction })
        } await transaction.commit();
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while updating the role'))
    }
};
exports.delete = async (req, res, next) => {
    try {
        console.log('DELETE ONE', req.params.id);
        const transaction = await sequelize.transaction()
        const document = await daily.destroy({
            where: {
                _id: req.params.id,
            },
        }, { transaction });
        await transaction.commit();
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while deleting the role'))
    }
};

