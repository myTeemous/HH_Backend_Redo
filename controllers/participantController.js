const pool = require('../util/database');  //needed for the database connection

//save an individual participant to the database
const saveParticipant = async (req, res) => {
    try {
        //Before inserting a new participant, check and see if their school exists.
        const school = req.body.school.toUpperCase();
        const response = await pool.query('SELECT id FROM school WHERE school_name = $1', [school]);

        //If the participants school exists, get the school id and insert it into the participant
        //table along with their first name, last name, and email.
        if(response.rows.length > 0) {
            const response2 = await pool.query('INSERT INTO participant (first_name, last_name, email, school_id) VALUES ($1, $2, $3, $4) RETURNING id',
            [req.body.firstName, req.body.lastName, req.body.email, parseInt(response.rows[0].id)]);
            res.status(200).json({ registrationConfirmation: 'You have successfully registered for HackHouston!' });
        }
        //If the participants school does not exist, insert the school first, then insert the
        //participants information.
        else {
            const response2 = await pool.query('INSERT INTO school (school_name) VALUES ($1) RETURNING id', [school]);
            const response3 = await pool.query('INSERT INTO participant (first_name, last_name, email, school_id) VALUES ($1, $2, $3, $4)',
            [req.body.firstName, req.body.lastName, req.body.email, parseInt(response2.rows[0].id)]);
            res.status(200).json({ registrationConfirmation: 'You have successfully registered for HackHouston!' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).end();
    }
};

//Get the name, email, and school of an individual participant.
const getParticipant = async (req, res) => {
    try {
        const email = req.body.email;
        const response = await pool.query('SELECT p.first_name, p.last_name, p.email, s.school_name FROM participant p INNER JOIN school s ON p.school_id = s.id WHERE p.email = $1', [email]);
        res.status(200).json(response.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).end();
    }
};

//Get the name, email, and school of all participants.
const getAllParticipants = async (req, res) => {
        
};

module.exports = {
    getParticipant,
    saveParticipant
}