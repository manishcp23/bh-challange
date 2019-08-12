'use strict';

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('user', {
        UsrId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        FName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        LName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        OrganizationId: {
            type: DataTypes.INTEGER(11),
        },
        RoleId: {
            type: DataTypes.INTEGER(11),
        },
        Email: {
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true, 
            validate: { 
                isEmail: 
                { 
                    msg: "Email invalid."
                } 
            }
        },
        SignUpTime: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: true,
    });

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    
    return Model;
};