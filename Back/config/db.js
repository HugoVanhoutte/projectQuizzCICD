const mysql = require("mysql2");
const isProduction = process.env.NODE_ENV === "prod";

// Create the pool
const pool = mysql.createPool({
    host: isProduction ? process.env.PROD_DB_HOST : process.env.DB_HOST,
    user: isProduction ? process.env.PROD_DB_USER : process.env.DB_USER,
    password: isProduction ? process.env.PROD_DB_PASSWORD : process.env.DB_PASSWORD,
    database: isProduction ? process.env.PROD_DB_NAME : process.env.DB_NAME,
    port: isProduction ? process.env.PROD_DB_PORT : process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 10,
    connectTimeout: 10000,
    acquireTimeout: 10000
});

const connectWithRetry = () => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL, retrying in 5 seconds:', err);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.info('Connected to MySQL!');
            connection.release();
        }
    });
};

// Export the pool with promise support
module.exports = pool.promise();

// Call connectWithRetry to initiate the first connection attempt
connectWithRetry();
