module.exports = (sequelize, DataTypes) => {
    let alias = "Categories";

    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    };

    let config = {
        tableName: "categories",
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models){
        Category.hasMany(models.Products, {
            as: "products",
            foreignKey: "categ_id"
        });

        Category.hasMany(models.Subcategories, {
            as: "subcategories",
            foreignKey: "categ_id"
        });
    };

    return Category;
};