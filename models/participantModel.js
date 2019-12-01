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