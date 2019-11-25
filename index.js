const express = require('express');
const db = require('./util/database');

const app = express();
const PORT = 3000;

db.execute('SELECT * FROM participant')
  .then(result => {
    console.log(result[0]);
  }).catch(err => {
    console.log(err);
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});