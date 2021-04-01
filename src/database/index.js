const Sequelize = require('sequelize');

const databaseConfig = require('../config/database');

const Payments = require('../app/models/Payments');
const Users = require('../app/models/Users');

const models = [Payments, Users];

class Database {
  constructor() {
    this.init()
  }

  init() {
    const configs = databaseConfig;
    this.connection = new Sequelize(configs);
    models.map(model => model.init(this.connection));
  }
}

module.exports = new Database();