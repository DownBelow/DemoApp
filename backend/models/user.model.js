module.exports = (sequelize, Sequelize) => {
    const userModel = sequelize.define('user',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                unique: true             
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            walletAddress: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true                                   
            },
            credit: {
                type: Sequelize.INTEGER(),
                defaultValue: 0
            },
            nonce: {
                type: Sequelize.INTEGER(),
                defaultValue: 0
            }
        }
    );

    return userModel;
};