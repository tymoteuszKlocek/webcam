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
                errorMessage: 'Username must be between 2 and 10 chars long'
            },
            errorMessage: 'Invalid Username'
        },
        'password': {
            notEmpty: true,
            errorMessage: 'Password must be repeated.'
        },
    };

    req.checkBody(schema);
    req.check('password', 'Password not confirmed - repeat the same password!').equals(req.body.confirmPassword);
    req.getValidationResult().then((result) => {
        try {
            result.throw();
            models.User.create(req.body).then(resp => {
                res.status(200).send({ success: true });
            }).catch(function (error) {
                console.log(error);
                res.status(200).send({ success: false, error: error });
            });
        } catch (error) {
            req.session.error = error.array();
            res.status(200).send({ success: false, error: req.session.error });
            req.session.error = null;
        }
    });
});

module.exports = router;
