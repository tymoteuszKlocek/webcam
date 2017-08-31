const express = require('express');
const router = express.Router();
const models = require('../models');

const schema = {
    'username': {
        notEmpty: true,
        errorMessage: 'Invalid Username'
    },
    'password': {
        notEmpty: true,
        errorMessage: 'Invalid Password'
    },
};

router.post('/', function (req, res, next) {

    models.User.findOne({ where: { username: req.body.username }, raw: true }).then(user => {

        if (!user) {
            return res.status(404).send({msg: "User not found. Create account."});
        }

        if (user) {
            req.checkBody(schema);
            req.check('password', "Wrong password").equals(user.password);
            req.getValidationResult().then((result) => {
                try {
                    result.throw();
                    req.session.user = user;
                    res.status(200).send({success: true, userID: user.id});
                } catch (errors) {
                    res.status(200).send({ success: false, errors: 'Invalid username or password'});
                }
                
            }).catch(err => {
                res.status(200).send({ success: false, errors: 'Invalid username' });
            });

        };
    });

});

module.exports = router;

