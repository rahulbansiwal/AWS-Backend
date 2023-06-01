const {Sequelize} = require('sequelize');
const env = require('../utils/env');
const {DB_NAME,DB_USERNAME,DB_PASSWORD,DB_HOSTNAME,DB_PORT} = env
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