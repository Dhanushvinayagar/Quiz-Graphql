const express = require("express");

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const { showdb, showuser, createuser } = require('./dbutils/constants')

const app = express();
const port = process.env.PORT || 8080;

const bodyparser = require("body-parser");
const { dbIsConnected, sqlQuery } = require("./dbutils/query");
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(express.json());

dbIsConnected(showdb)

app.get('/', (req, res) => {
    res.send("Welcome to graphql server page");
});

app.get('/users', async (req, res) => {
    try {
        const response = await sqlQuery(showuser)
        res.status(200).send({"response":response})
    } catch (err) {
        console.error("Found error : ", err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const token = req.body.token
        if(username && password && token){
            const query = createuser(username,password,token)
            const response = sqlQuery(query)
            res.status(200).json({ "data": "successfully updated"})
        }else{
            throw new Error("check the data")
        }
    } catch (err) {
        console.log("error", err);
        res.status(500).json({"error": err.message})
    }
})

app.listen(port, () => {
    console.log("server page (graphql) started on port ", port);
});

