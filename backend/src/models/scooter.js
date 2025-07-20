'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scooter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
// define association here
      Scooter.belongsTo(models.Category, { 
        targetKey: "id",
        foreignKey: 'category_id',
        as: 'category' 
      });
      Scooter.belongsTo(models.SafetyInfo, { 
        foreignKey: 'safety_info_id',
        targetKey: "id",
        as: 'safetyInfo'
      });
      Scooter.hasMany(models.Discount, { 
        sourceKey: 'id',
        foreignKey: 'scooter_id',
        as: 'discount'
        
      });
      Scooter.belongsToMany(models.Order, {
        through: models.OrderItem,
        foreignKey: "scooter_id",
        otherKey: "order_id",
        as: "orders",
      });
    }
  }
  Scooter.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    brand: DataTypes.STRING,
    battery: DataTypes.STRING,
    charge_time: DataTypes.DECIMAL,
    weight: DataTypes.DECIMAL,
    tyres: DataTypes.STRING,
    motor_type: DataTypes.STRING,
    max_speed: DataTypes.DECIMAL,
    max_range: DataTypes.DECIMAL,
    max_load: DataTypes.DECIMAL,
    length_cm: DataTypes.INTEGER,
    width_cm: DataTypes.INTEGER,
    height_cm: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    category_id: DataTypes.INTEGER,
    safety_info_id: DataTypes.INTEGER,
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Scooter',
  });
  return Scooter;
};