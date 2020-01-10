const { body, validationResult } = require('express-validator');

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
    }
};

//check if the request has a session variable for participantId to determine if the user is logged in
exports.isLoggedIn = (req, res, next) => {
    if(req.session.participantId) {
        return next(new Error('You are already logged in'));
    }

    next();
};