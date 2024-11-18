const db = require('./db');

const dbQuery = (query, params) => {
    console.log("executing query: ", query, params)
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) {
                console.log("query error: ", err)
                reject(err);
            }
            console.log("query results: ", result)
            resolve(result)
        })
    })
}
module.exports = dbQuery
