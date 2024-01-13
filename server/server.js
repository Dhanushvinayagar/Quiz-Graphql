const express = require("express");
const mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 8080;

const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(express.json());


const pool = mysql.createPool({
    connectionLimit: 10, 
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    database: process.env.DB
});
console.log(pool);
pool.on('connection',()=>{
    console.log("Db connected");
})

app.get('/', (req, res) => {
    res.send("Welcome to graphql server page");
});

app.get('/person', async (req, res) => {
    try {
      
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection from pool:', err);
                res.status(500).json({ error: err.message });
                return;
            }

            const sqlQuery = 'SELECT * FROM user';
            
            connection.query(sqlQuery, (queryErr, result) => {
                connection.release();

                if (queryErr) {
                    console.error('Error executing query:', queryErr);
                    res.status(500).json({ error: queryErr.message });
                    return;
                }

                console.log("result", result);
                res.send({ person: result });
            });
        });
    } catch (err) {
        console.error("Found error : ", err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/signup',async(req,res)=>{
    try{ 
            const username = req.body.username
            // const 
            
            res.status(200).json({"data":data})

    }catch(err){
        console.log("error",err);
        res.status(500).json("error",err)
    }
})

app.listen(port, () => {
    console.log("server page (graphql) started on port ", port);
});
