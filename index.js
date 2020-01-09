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
    }
}));

//mount routes
app.use(homeRoutes);
app.use(registerRoutes);
app.use(loginRoutes);

/*
app.post('/test', validate('validateParticipant'), async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        else {
            const { name, email, password } = req.body;
            res.status(200).json({ name: name, email: email });
        }
    }
    catch (err) {
        console.log(err);
        res.end();
    }
});
*/

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});