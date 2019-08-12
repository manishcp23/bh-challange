'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const {TE, to}          = require('../services/util.service');
const CONFIG            = require('../config/config');



module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('login', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        UsrId: {
            type: DataTypes.INTEGER(11),
            allowNull: false
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
        password  : DataTypes.STRING
    }, {
        timestamps: true,
    });

    Model.beforeSave(async (Login, options) => {
        let err;
        if (Login.changed('password')){
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            Login.password = hash;
        }
    });
    

    Model.prototype.comparePassword = async function (pw) {
        let err, pass
        if(!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if(err) TE(err);

        if(!pass) TE('invalid password');

        return this;
    }

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer "+jwt.sign({userId:this.UsrId}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};