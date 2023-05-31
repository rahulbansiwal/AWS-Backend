const {Sequelize} = require('sequelize');
require('dotenv').config({path:"../config.env"});
const {DB_NAME,DB_USERNAME,DB_PASSWORD,DB_HOSTNAME,DB_PORT} = process.env
const sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
        dialect:'mysql',
        host: DB_HOSTNAME,
        port: DB_PORT,
        logging:console.log
    }
);


module.exports = sequelize;