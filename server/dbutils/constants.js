const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const user = process.env.DBUSERTABLE
const showdb = 'SHOW DATABASES'
const showuser = `SELECT * from ${user}`
const createuser = (username ,password ,token) => `INSERT INTO ${user} (username,password,token) VALUES ('${username}','${password}','${token}')`

module.exports = {showdb,showuser,createuser}