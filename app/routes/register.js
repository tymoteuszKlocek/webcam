const express = require('express');

const router = express.Router();
const models = require('../models');

router.post('/', (req, res) => {

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
            isLength: {
                options: [{ min: 4, max: 10 }],
                errorMessage: 'Password must be between 2 and 10 chars long'
            },
            errorMessage: 'Invalid Password'
        },
    };

    models.User.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if (user) {
            res.status(200).send({ success: false, error: 'Username is already used.' });
            return;
        } else {
            req.checkBody(schema);
            req.check('password', 'Password not confirmed - repeat the same password!').equals(req.body.confirmPassword);
            req.getValidationResult().then((result) => {
                try {
                    result.throw();
                    models.User.create(req.body).then(() => {
                        res.status(200).send({ success: true });
                    }).catch(function (error) {
                        res.status(200).send({ success: false, error: error });
                    });
                } catch (error) {
                    req.session.error = error.array();
                    res.status(200).send({ success: false, error: req.session.error });
                    req.session.error = null;
                }
            });
        }
    });


});

module.exports = router;
