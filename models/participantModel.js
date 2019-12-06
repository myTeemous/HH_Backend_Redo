const db = require('../util/database');  //needed for the database connection

module.exports = class Participant {
    constructor(email, firstName, lastName, school) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.school = school;
    }

    //save an individual participant to the database
    saveParticipant() {
        //check if school already exists in database
        //if school exists, insert participant info along with school id(foreign key) that was found
        //if school does not exist, insert school name into school table, retreive school id,
        //and insert participant info along with school id into participant table.
        //const school = db.execute('SELECT schoolName FROM school WHERE schoolName LIKE %?%', [this.school]);
        

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
    }

    //retrieve all information on an individual participant
    getParticipant(email) {
        
    }

    //retrieve all participants
    static getAllParticipants() {
        return db.execute('SELECT participant.firstName, participant.lastName, ' + 
                                 'participant.email, school.schoolName ' +
                                 'FROM participant ' +
                                 'INNER JOIN school ' +
                                 'ON participant.schoolID = school.id');
    }
}