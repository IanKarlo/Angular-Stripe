const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Payments extends Model {
  static init(sequelize) {
    super.init({
      value: Sequelize.FLOAT,
      currency: Sequelize.STRING,
      status: Sequelize.STRING,
      client_secret: Sequelize.STRING,
      user_id: Sequelize.INTEGER,
      payment: Sequelize.STRING
    },
    {
      sequelize
    });
  }
}

module.exports = Payments