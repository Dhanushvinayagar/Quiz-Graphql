const express = require("express");
const morgan = require('morgan')
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 8080;
app.use(morgan('tiny'))
app.use(cors())

const bodyparser = require("body-parser");
const { dbIsConnected } = require("./dbutils/query");
const router = require("./controller/routes");
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(express.json());

const dbConnection = async () => {
    try {
        await dbIsConnected()
    } catch (err) {
        console.error("Error occured during db connection :", err);
    }
}

dbConnection()

app.use('/', router)

app.listen(port, () => {
    console.log("server page (graphql) started on port ", port);
});

