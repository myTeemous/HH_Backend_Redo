const pg = require('../util/database');  //needed for the database connection

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

    }

    //retrieve all information on an individual participant
    getParticipant(email) {
        
    }

    //retrieve all participants
    static getAllParticipants() {
        
    }
}