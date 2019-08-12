const { TE, to } = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('role', {
    RoleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    RoleName: DataTypes.STRING
  }, {
    timestamps: true
  });


  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};