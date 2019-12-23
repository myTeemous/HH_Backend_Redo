const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hackhoustondb',
    password: 'Q!squirestrat35',
    port: 5432
});

pool.connect();

module.exports = pool;