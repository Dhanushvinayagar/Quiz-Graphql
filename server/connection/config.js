const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    database: process.env.DB
})

module.exports = connection