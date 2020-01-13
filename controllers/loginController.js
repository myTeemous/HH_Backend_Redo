const pool = require('../util/database');  //needed for the database connection
const { validationResult } = require('express-validator');
const { compare } = require('bcryptjs');


exports.login = async (req, res) => {
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
                res.status(422).json({ message: 'Incorrect Email or Password' });
            }

            req.session.participantId = response.rows[0].id;

            res.status(200).json({ message: 'You are now logged in' });
        }
    }
    catch (err) {
        console.error(err);
        throw err;
        //res.status(500).json({ error: err });
    }
};