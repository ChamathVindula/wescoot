'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Discount.belongsTo(models.Scooter, {
        targetKey: "id",
        foreignKey: "scooter_id",
        as: 'scooter',
      });
    }
  }
  Discount.init({
    scooter_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount_percentage: DataTypes.DECIMAL(5, 2),
    valid_from: DataTypes.DATE,
    valid_until: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Discount',
  });
  return Discount;
};