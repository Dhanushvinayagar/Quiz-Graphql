const connection = require('../connection/config')

const dbIsConnected = async (query) => {
    await connection.connect(function (err) {
        if (err) {
            console.log("Error in the connection", err)
            throw new Error(err.message)
        }
        else {
            console.log(`Database Connected`)
            connection.query(query,
                (error, result) => {
                    if (error) {
                        console.log(`Error executing the query - ${error}`)
                        throw new Error(error.message)
                    }
                    else
                        console.log("DATABASES : ", result)
                })
        }
    })
}

const sqlQuery = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error) {
                console.log(`Error executing the query - ${error}`);
                reject(error);
            } else {
                console.log("Result: ", result);
                resolve(result);
            }
        });
    });
};

module.exports = { dbIsConnected, sqlQuery }