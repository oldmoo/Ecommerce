const Sequelize = require("sequelize");

const sequelize = new Sequelize("shop", "oldmo", "ligue5", {
  dialect: "postgres",
  host: "localhost",
});
module.exports = sequelize;
