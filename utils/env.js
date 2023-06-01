//console.log(process.env);

const path = require('path');
const dir = path.join(__dirname,'../config.env')
const variables = require('dotenv').config({path:dir});
module.exports = variables.parsed;