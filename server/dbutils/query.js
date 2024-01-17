const connection = require('../connection/config')

const dbIsConnected = async () => {
    await new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject(err);
            } else {
                console.log(`Database Connected`);
                resolve();
            }
        })
    })
}

const sqlQuery = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error) {
                // console.log(`Error executing the query - ${error}`);
                reject(error);
            } else {
                // console.log("Result: ", result);
                resolve(result);
            }
        });
    });
};

module.exports = { dbIsConnected, sqlQuery }