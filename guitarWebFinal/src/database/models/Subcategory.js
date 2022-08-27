module.exports = (sequelize, DataTypes) => {
    let alias = "Subcategories";

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
        categ_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    };

    let config = {
        tableName: "subcategories",
        timestamps: false
    };

    const Subcategory = sequelize.define(alias, cols, config);

    Subcategory.associate = function(models){
        Subcategory.belongsTo(models.Categories, {
            as: "categories",
            foreignKey: "categ_id"
        });

        Subcategory.hasMany(models.Products, {
            as: "products",
            foreignKey: "subcateg_id"
        });
    };

    return Subcategory;
};