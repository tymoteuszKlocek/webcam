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
    req.session.userID = '';
    console.log('req.session', req.session);
    models.User.findAll({ where: { username: req.body.username } }).then(user => {
        req.session.userID = user[0].id
        res.send(200, req.session.userID);
        req.checkBody(schema);
        req.check('password', "Wrong password").equals(user[0].password);
        req.getValidationResult().then((result) => {
            try {
                result.throw();
                
                //res.send({ success: true });
            } catch (errors) {
                //req.session.errors = errors.array();
                res.send({ success: false });
                req.session.errors = null;
            }
        });
    }).catch(err => {
        res.send({ success: false, errors: 'Invalid username' });
    });

});

module.exports = router;

