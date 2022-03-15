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
                type: Sequelize.STRING
            },
            creditAmount: {
                type: Sequelize.INTEGER(),
                defaultValue: 0
            },
            abyssAmount: {
                allowNull: false,
                type: Sequelize.STRING
            },
            prevCredit: {
                type: Sequelize.INTEGER(),
                defaultValue: 0
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING
            },
            eventId: {
                type: Sequelize.INTEGER(),
                defaultValue: 0    
            }
        }
    );

    return transactionModel;
};