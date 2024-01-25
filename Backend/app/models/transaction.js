const { sequelize } = require("../config/index");
const {
    Users,
    Accounts,
    Positions,
} = require("../models/index.model");

const { getDecrypt, setEncrypt } = require("../middleware/crypto.middleware");
exports.createUserAndAccount = async (userData) => {
    const transaction = await sequelize.transaction();
    try {
        const newUser = await Users.create(userData, { transaction });
        const position = await Positions.findOne({ where: { name: userData.positionName } });
        let password = setEncrypt(userData.password);
        let accountData = {
            name: newUser.phone,
            password: password,
            isActive: 1,
            userId: newUser._id,
            positionId: position._id,
        };
        const newAccount = await Accounts.create(accountData, { transaction });

        await transaction.commit();
        return { message: "success", status: "success" };
    } catch (error) {
        if (transaction) {
            if (!transaction.finished) {
                console.log(">>>Error");
                await transaction.rollback();
            }
        }
        throw error;
    }
};

