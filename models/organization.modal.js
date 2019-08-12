const { TE, to } = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('organization', {
    OrganizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: DataTypes.STRING
  }, {
    timestamps: true
  });


  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};