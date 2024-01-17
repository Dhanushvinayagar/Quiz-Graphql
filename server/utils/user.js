const bcrypt = require('bcrypt');
const { createuser, showuser, salt, getuser, hashString, updateUsertoken, getuserandToken } = require("../dbutils/constants");
const { sqlQuery } = require("../dbutils/query");


const users = async (req, res) => {
    try {
        const response = await sqlQuery(showuser)
        res.status(200).send({ "response": response })
    } catch (err) {
        console.error("Found error : ", err);
        res.status(500).json({ error: err.message });
    }
}
const signup = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        if (username && password) {
            const token = '1'
            const query = createuser(username, password, token)
            const response = await sqlQuery(query)
            res.status(200).json({ "data": "successfully updated", "quizusertoken": token })
        } else {
            throw new Error("check the data")
        }
    } catch (err) {
        console.log("error", err);
        res.status(500).json({ "error": err.message })
    }
}

const login = async (req, res) => {
    try {
        const username = req.query.username
        const password = req.query.password
        if (username && password) {
            const query = getuser(username)
            const response = await sqlQuery(query)
            console.log(response);
            if (response.length) {
                if (password === response[0].password) {
                    const token = await bcrypt.hash(username, salt)
                    const query = updateUsertoken(username, token)
                    const response = await sqlQuery(query)
                    
                    res.status(200).json({ "data": "successfully updated", "quizusertoken": token })
                } else {
                    throw new Error("Password not matching ")
                }
            } else {
                throw new Error("User not found")
            }
        } else {
            throw new Error("check the data")
        }
    } catch (error) {
        console.error("Error occured ", error);
        res.status(500).json({ "error": error.message });
    }
}


const loggedin = async (req, res) => {
    try {
        const username = req.query.username
        const token = req.query.token
        if (username) {
            const query = getuserandToken(username, token)
            const response = await sqlQuery(query)
            console.log(response,query);
            if (response.length) {  
                res.status(200).json({ "loggedin": true, "quizusertoken": token })
            } else {
                throw new Error("User or token not found")
            }
        } else {
            throw new Error("check the data")
        }

    } catch (error) {
        console.error("Error occured :", error);
        res.status(500).json({ "Error": error.message })
    }
}

module.exports = { users, signup, login, loggedin }