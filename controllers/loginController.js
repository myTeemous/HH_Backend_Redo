const pool = require('../util/database');  //needed for the database connection
const path = require('path');
const { validationResult } = require('express-validator');
const { compare } = require('bcryptjs');
const { createSession, loggedIn } = require('../controllers/authController');

exports.login = async (req, res) => {
    if(req.session.isLoggedIn) {
        res.sendFile(path.join(__dirname, '../views', 'myProfile.html'));
    }
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ message: errors.array() });
        }
        else {
            const { email, password } = req.body;

            const response = await pool.query('SELECT id, password FROM participant WHERE email = $1', [email]);

            const passWordMatch = await compare(password, response.rows[0].password);
            
            if(response.rows.length === 0 || !passWordMatch) {
                res.sendFile(path.join(__dirname, '../views', 'login.html'));
            }

            req.session.participantId = response.rows[0].id;
            req.session.isLoggedIn = true;
            //createSession(req, response.rows[0].id);

            res.sendFile(path.join(__dirname, '../views', 'myProfile.html'));
        }
    }
    catch (err) {
        console.error(err);
        throw err;
        //res.status(500).json({ error: err });
    }
};