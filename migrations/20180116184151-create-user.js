'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      UsrId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FName: {
        type: Sequelize.STRING
      },
      LName: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      OrganizationId: {
        type: Sequelize.INTEGER,
      },
      RoleId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};