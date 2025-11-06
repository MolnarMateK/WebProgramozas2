const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'studb026',
    password: 'abc123',
    database: 'db026',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();