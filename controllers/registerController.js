const pool = require('../util/database');  //needed for the database connection
const { validationResult } = require('express-validator');
const { hash } = require('bcryptjs');

//save an individual participant to the database
exports.saveParticipant = async (req, res) => {
    if(req.session.isLoggedIn) {
        res.status(200).json({ message: 'You are already logged in' });
    }
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ message: errors.array() });
        }
        else {
            const { firstName, lastName, email, password } = req.body;
            const school = req.body.school.toUpperCase();

            //check if the user already exists
            const response = await pool.query('SELECT email FROM participant WHERE email = $1', [email]);

            //If the users email already exists, they must use another email
            if(response.rows.length > 0) {
                res.status(422).json({ message: 'Error: User already exists' });
            }
            else {
                //hash password
                const hashedPassWord = await hash(password, 12);

                //Before inserting a new participant, check and see if their school exists.
                const response2 = await pool.query('SELECT id FROM school WHERE school_name = $1', [school]);

                //If the participants school exists, get the school id and insert it into the participant
                //table along with their first name, last name, email, and password.
                if(response2.rows.length > 0) {
                    const response3 = await pool.query('INSERT INTO participant (first_name, last_name, email, school_id, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                    [firstName, lastName, email, parseInt(response2.rows[0].id), hashedPassWord]);

                    //create session with participant id
                    req.session.participantId = response3.rows[0].id;
                    req.session.isLoggedIn = true;

                    res.status(200).json({ message: 'You have successfully registered for HackHouston!' });
                }
                //If the participants school does not exist, insert the school first, then insert the
                //participants information.
                else {
                    const response3 = await pool.query('INSERT INTO school (school_name) VALUES ($1) RETURNING id', [school]);
                    const response4 = await pool.query('INSERT INTO participant (first_name, last_name, email, school_id, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                    [firstName, lastName, email, parseInt(response3.rows[0].id), hashedPassWord]);

                    //create session with participant id
                    req.session.participantId = response4.rows[0].id;
                    req.session.isLoggedIn = true;

                    res.status(200).json({ message: 'You have successfully registered for HackHouston!' });
                }
            }
        }
    }
    catch (err) {
        console.error(err);
        throw err;
        //res.status(500).json({ error: err });
    }
};