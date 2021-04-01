const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Users extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      amount: Sequelize.FLOAT
    },
    {
      sequelize
    });
  }
}

module.exports = Users