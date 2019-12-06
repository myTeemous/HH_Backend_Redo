const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./util/database');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/', (req, res) => {
  db.execute('INSERT INTO students (firstName, lastName, email, schoolName) VALUES (?, ?, ?, ?)',
  [req.body.firstname, req.body.lastname, req.body.email, req.body.school.toUpperCase()])
  .then((result) => {
    //res.send(result.insertId)
    console.log(result[0].insertId);
    res.json({insertion: result[0].insertId});
  })
  .catch((err) => {
    console.log(err);
    res.json({insertion: -1});
  });
  /*
  db.execute('SELECT id FROM school WHERE schoolName = ?', [req.body.school.toUpperCase()])
  .then((result) => {
    if(result[0].length === 0) {
      db.execute('INSERT INTO school (schoolName) VALUES (?)', [req.body.school.toUpperCase()])
      .then((result2) => {
        db.execute('INSERT INTO participant (firstName, lastName, email, schoolID) VALUES (?, ?, ?, ?)', [req.body.firstname, req.body.lastname, req.body.email, result2[0].insertId])
        .then((result3) => {
            // res.send(result.[0]affectedRows)
            res.end();
        })
        .catch(err => console.log(err)) 
      })
      .catch(err => console.log(err))
    }
    else {
      db.execute('INSERT INTO participant (firstName, lastName, email, schoolID) VALUES (?, ?, ?, ?)', [req.body.firstName, req.body.lastName, req.body.email, result[0][0].id])
      .then((result2) => {
        // res.send(result.affectedRows)
        res.end();
      })
      .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
  */
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

