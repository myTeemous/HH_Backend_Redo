const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hackhoustondb',
    password: process.env.DB_PASSWORD,
    port: 5432
});

pool.connect();

module.exports = pool;