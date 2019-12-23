const pool = require('../util/database');  //needed for the database connection

//save an individual participant to the database
const saveParticipant = async (req, res) => {
    try {
        const school = req.body.school.toUpperCase();
        const response = await pool.query('SELECT id FROM school WHERE school_name = $1', [school]);

        if(response.rows.length > 0) {
            const response2 = await pool.query('INSERT INTO participant (first_name, last_name, email, school_id) VALUES ($1, $2, $3, $4) RETURNING id',
            [req.body.firstName, req.body.lastName, req.body.email, parseInt(response.rows[0].id)]);
            console.log(response2);
            res.end();
        }
        else {
            const response2 = await pool.query('INSERT INTO school (school_name) VALUES ($1) RETURNING id', [school]);
            const response3 = await pool.query('INSERT INTO participant (first_name, last_name, email, school_id) VALUES ($1, $2, $3, $4)',
            [req.body.firstName, req.body.lastName, req.body.email, parseInt(response2.rows[0].id)]);
            console.log(response3);
            res.end();
        }
    }
    catch (err) {
        console.log(err);
        res.end();
    }
};

//retrieve all information on an individual participant
const getParticipant = async (req, res) => {
    try {
        const school = req.body.school;
        const response = await pool.query('INSERT INTO school (school_name) VALUES ($1) RETURNING id', [school]);
        console.log(response.rows[0].id);
        res.end();
        //res.status(200).json(response.row[0]);
    }
    catch (err) {
        console.log(err);
        res.end();
    }
};

//retrieve all participants
const getAllParticipants = async (req, res) => {
        
};

module.exports = {
    getParticipant,
    saveParticipant
}