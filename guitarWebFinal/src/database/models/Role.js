module.exports = (sequelize, DataTypes) => {
    let alias = "Roles";

    let cols = {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        }
    }

    let config = {
        tableName: "roles",
        timestamps: false,
    }

    const Role = sequelize.define(alias, cols, config);

    Role.associate = function(models){
        Role.hasMany(models.Users, {
            as: 'users',
            foreignKey: 'role_id'
        })
    }

    return Role;
};