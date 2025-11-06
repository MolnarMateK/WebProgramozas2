const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',        // Ezt átírtuk!
    password: '',       // Ezt átírtuk! (üres jelszó)
    database: 'db026',   // Ez az, amit az előbb létrehoztál
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
