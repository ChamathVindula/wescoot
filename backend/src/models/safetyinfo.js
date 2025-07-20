'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SafetyInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associatione
    }
  }
  SafetyInfo.init({
    helmet_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    min_age_required: DataTypes.INTEGER,
    general_guidelines: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'SafetyInfo',
  });
  return SafetyInfo;
};