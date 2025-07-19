'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceAppointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServiceAppointment.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    }
  }
  ServiceAppointment.init({
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    notes: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
      defaultValue: 'scheduled'
    }
  }, {
    sequelize,
    modelName: 'ServiceAppointment',
  });
  return ServiceAppointment;
};