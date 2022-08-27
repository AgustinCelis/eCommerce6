module.exports = (sequelize, DataTypes) => {
    let alias = "Users";

    let cols = {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
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
        username: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(254),
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false
        },
        avatar: {
            type: DataTypes.TEXT('tiny')
        },
        role_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }

    let config = {
        tableName: "users",
        createdAt: "created_at",    
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.belongsTo(models.Roles, {
            as: 'roles',
            foreignKey: 'role_id'
        });

        User.hasMany(models.Carts, {
            as: 'carts',
            foreignKey: 'user_id'
        });

        User.hasMany(models.Orders, {
            as: 'orders',
            foreignKey: 'user_id'
        })
    };

    return User;
};