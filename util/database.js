const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hackhouston',
    password: '',
    port: 5432
});

pool.connect();

module.exports = pool;