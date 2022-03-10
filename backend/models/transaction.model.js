module.exports = (sequelize, Sequelize) => {
    const transactionModel = sequelize.define('transaction', 
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                unique: true       
            },
            walletAddress: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            creditAmount: {
                type: Sequelize.INTEGER(),
                defaultValue: 0
            },
            abyssAmount: {
                type: Sequelize.DECIMAL(30, 18),
                defaultValue: 0   
            },
            prevCredit: {
                type: Sequelize.INTEGER(),
                defaultValue: 0
            }
        }
    );

    return transactionModel;
};