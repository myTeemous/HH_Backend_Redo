const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'hackhouston',
    password: '',
    port: 5432,
});

client.connect();

module.exports = pool.promise();