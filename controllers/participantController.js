const pool = require('../util/database');  //needed for the database connection

//save an individual participant to the database
const saveParticipant = async (req, res) => {

};

//retrieve all information on an individual participant
const getParticipant = async (req, res) => {
    try {
        const email = req.body.email;
        const response = await pool.query('SELECT * FROM public."PARTICIPANT" WHERE email = $1', [email]);
        console.log(response.rows[0]);
        res.end();
        //res.status(200).json(response.row[0]);
    }
    catch (err) {
        console.log(err);
    }
};

//retrieve all participants
const getAllParticipants = async (req, res) => {
        
};

module.exports = {
    getParticipant
}