module.exports = (sequelize, DataTypes) => {
    let alias = "Orders";

    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    };

    let config = {
        tableName: 'orders',
        createdAt: 'date',
        updatedAt: false,
        deletedAt: false
    };

    const Order = sequelize.define(alias, cols, config);

    Order.associate = function(models){
        Order.belongsTo(models.Users, {
            as: 'users',
            foreignKey: 'user_id'
        })
    }

    return Order;
};