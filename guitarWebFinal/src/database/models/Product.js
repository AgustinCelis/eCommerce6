module.exports = (sequelize, DataTypes) => {
    let alias = "Products";

    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        categ_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        subcateg_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        deleted_at: {
            type: DataTypes.DATE
        },
        name:{
            type: DataTypes.STRING(64),
            allowNull: false
        },
        image_1: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        image_2: {
            type: DataTypes.STRING(256)
        },
        image_3: {
            type: DataTypes.STRING(256)
        },
        image_4: {
            type: DataTypes.STRING(256)
        },
        description: {
            type: DataTypes.STRING(240),
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        available_amount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        color_1: {
            type: DataTypes.STRING(256)
        },
        color_2: {
            type: DataTypes.STRING(256)
        },
        color_3: {
            type: DataTypes.STRING(256)
        },
        color_4: {
            type: DataTypes.STRING(256)
        },
        color_5: {
            type: DataTypes.STRING(256)
        },
        characteristics: {
            type: DataTypes.TEXT('medium')
        },
        body_specs: {
            type: DataTypes.TEXT('medium')
        },
        neck_specs: {
            type: DataTypes.TEXT('medium')
        },
        accesories_specs: {
            type: DataTypes.TEXT('medium')
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    };

    config = {
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.Categories, {
            as: "categories",
            foreignKey: "categ_id"
        });

        Product.belongsTo(models.Subcategories, {
            as: "subcategories",
            foreignKey: "subcateg_id"
        });

        Product.hasMany(models.Carts, {
            as: 'carts',
            foreignKey: 'product_id'
        });
    };

    return Product;
};
