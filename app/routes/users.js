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
                res.status(200).send({ success: true });
            }).catch(function (err) {
                console.log(err);
            });
        } catch (errors) {
            req.session.errors = errors.array();
            res.status(200).send({ success: false, errors: req.session.errors });
            //req.session.errors = null;
        }
    });
});

    module.exports = router;
