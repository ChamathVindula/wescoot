'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Discounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scooter_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Scooters',
          key: 'id'
        }
      },
      discount_percentage: {
        type: Sequelize.DECIMAL(5, 2)
      },
      valid_from: {
        type: Sequelize.DATE
      },
      valid_until: {
        type: Sequelize.DATE
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Discounts');
  }
};