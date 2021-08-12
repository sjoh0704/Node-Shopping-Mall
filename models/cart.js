'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cart.init({
    cartId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.STRING,
    goodsId: DataTypes.STRING,
    quantity: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};