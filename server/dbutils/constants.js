const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const salt = 3;
const hashString = new Date().getDate()+new Date().getMinutes()+new Date().getDay()
const user = process.env.DBUSERTABLE
const showdb = 'SHOW DATABASES'
const showuser = `SELECT * from ${user}`
const createuser = (username ,password ,token) => `INSERT INTO ${user} (username,password,token) VALUES ('${username}','${password}','${token}')`
const getuser = (username) => `SELECT * FROM  ${user} WHERE username='${username}'`
const getuserandToken = (username,token) => `SELECT * FROM  ${user} WHERE username = '${username}' and token = '${token}'`
const updateUsertoken = (username , token) => `UPDATE  ${user} SET  token = '${token}' WHERE username='${username}'`

module.exports = {showdb,showuser,createuser ,salt ,getuser ,hashString , updateUsertoken ,getuserandToken}