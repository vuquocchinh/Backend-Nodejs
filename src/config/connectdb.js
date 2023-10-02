const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('qlkb', 'root', null, {
  host: 'localhost',
  port: 50001,
  dialect   : 'mysql',
  logging: false
});

let connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
module.exports = connectDB;