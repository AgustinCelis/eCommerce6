module.exports = (sequelize, DataTypes) => {
    let alias = 'Carts';

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
        product_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    };

    let config = {
        tableName: 'carts',
        createdAt: 'date',
        updatedAt: false,
        deletedAt: false
    }

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function(models){
        Cart.belongsTo(models.Users, {
            as: 'users',
            foreignKey: 'user_id'
        });

        Cart.belongsTo(models.Products, {
            as: 'products',
            foreignKey: 'product_id'
        });
    };

    return Cart
}