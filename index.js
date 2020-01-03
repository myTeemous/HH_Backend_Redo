require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;
const sessionLifeTime = 1000 * 60 * 5;

//import routes
const registerRoutes = require('./routes/register');

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'jfe9ru79&Jkdoqpjr20rF#@dr',
    cookie: {
        maxAge: sessionLifeTime,
        sameSite: true,
    }
}));

//mount routes
app.use(registerRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

