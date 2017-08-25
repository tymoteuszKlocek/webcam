const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', (req, res, next) => {

    const schema = {
        'email': {
            notEmpty: true,
            isEmail: {
                errorMessage: 'Invalid Email'
            }
        },
        'username': {
            notEmpty: true,
            isLength: {
                options: [{ min: 2, max: 10 }],
                errorMessage: 'Must be between 2 and 10 chars long'
            },
            errorMessage: 'Invalid Username'
        },
        'password': {
            notEmpty: true,
            errorMessage: 'Password must be repeated.' 
        },
    };

    req.checkBody(schema);
    req.check('password', 'Password not confirmed - repeat password!').equals(req.body.confirmPassword);
    req.getValidationResult().then((result) => {
        try {
            result.throw();
            models.User.create(req.body).then(resp => {
                req.session.userID = 1//resp.user.id
                console.log('session', resp);
                console.log('session', req.session.userID);
                res.send(200, req.session.userID);
            }).catch(function (err) {
                // print the error details
                console.log(err);
            });
            res.send({ success: true });
        } catch (errors) {
            req.session.errors = errors.array();
            res.send({ success: false, errors: req.session.errors });
            req.session.errors = null;
        }

    });
});

    module.exports = router;
