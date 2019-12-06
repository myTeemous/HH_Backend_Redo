const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'studentinfo',
    password: 'Q!squirestrat35',
});

module.exports = pool.promise();