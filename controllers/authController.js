const { body } = require('express-validator');

//Note to self: This validation is weak. Fix it later

exports.validate = (method) => {
    switch (method) {
        case 'validateRegistration': {
            return [
                body('firstName', 'First Name field cannot be empty').not().isEmpty().trim().escape(),
                body('lastName', 'Last Name field cannot be empty').not().isEmpty().trim().escape(),
                body('email', 'Must be a valid email address').not().isEmpty().isEmail().normalizeEmail(),
                body('school', 'School field cannot be empty').not().isEmpty().trim().escape(),
                body('password', 'Must enter a password').not().isEmpty().trim().isLength({ min: 5, max: 60 })
            ]
        }
        case 'validateLogin': {
            return [
                body('email', 'Must be a valid email address').not().isEmpty().isEmail().normalizeEmail(),
                body('password', 'Must enter a password').not().isEmpty().trim().isLength({ min: 5, max: 60 })
            ]
        }
    }
};

exports.createSession = (req, id) => {
    req.session.participantId = id;
    req.session.isLoggedIn = true;
};

exports.loggedIn = (req) => {
    return req.session.isLoggedIn;
};