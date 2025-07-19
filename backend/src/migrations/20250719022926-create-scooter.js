'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Scooters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      brand: {
        type: Sequelize.STRING
      },
      battery: {
        type: Sequelize.STRING
      },
      charge_time: {
        type: Sequelize.DECIMAL
      },
      weight: {
        type: Sequelize.DECIMAL
      },
      tyres: {
        type: Sequelize.STRING
      },
      motor_type: {
        type: Sequelize.STRING
      },
      max_speed: {
        type: Sequelize.DECIMAL
      },
      max_range: {
        type: Sequelize.DECIMAL
      },
      max_load: {
        type: Sequelize.DECIMAL
      },
      length_cm: {
        type: Sequelize.INTEGER
      },
      width_cm: {
        type: Sequelize.INTEGER
      },
      height_cm: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      safety_info_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SafetyInfos',
          key: 'id'
        }
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
    await queryInterface.dropTable('Scooters');
  }
};