require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient();
const RedisStore = require('connect-redis')(session);

const app = express();
const PORT = 3000;
const sessionLifeTime = 1000 * 60 * 5;

redisClient.on('connect',() => {
    console.log('Redis client connected');
});

redisClient.on('error',(err) => {
    console.log('Something went wrong with Redis: ' + err);
});

//import routes
const homeRoutes = require('./routes/home');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const myProfileRoutes = require('./routes/myProfile');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'jfe9ru79&Jkdoqpjr20rF#@dr',
    store: new RedisStore({ client: redisClient }),
    cookie: {
        maxAge: sessionLifeTime,
        sameSite: true,
        secure: false
    }
}));

//mount routes
app.use(homeRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(myProfileRoutes);

/*
app.get('/test', async (req, res) => {
    console.log(req.session.isLoggedIn);
    if(req.session.isLoggedIn) {
        console.log('Session variable saved!');
    }
    else {
        console.log('Session NOT saved');
    }
    res.json({ message: 'reading session' });
});

app.get('/setSession', async (req, res) => {
    console.log(req.session);
    req.session.isLoggedIn = true;
    console.log(req.session);
    //req.session.save();
    res.json({ message: 'creating session' });
});
*/

app.use(function (req, res, next) {
    res.status(404).json({ message: 'Page does not exist'});
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});