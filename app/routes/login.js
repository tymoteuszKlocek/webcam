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
                    res.status(200).send({ success: false, errors: errors});
                    res.send();
                }
                
            }).catch(err => {
                res.send({ success: false, errors: 'Invalid username' });
            });

        };
    });

});

// router.post('/', function (req, res, next) {
//     console.log('req.session1', req.session);
//     models.User.findAll({ where: { username: req.body.username } }).then(user => {
//         req.session.user = user[0];
//         console.log('req.session2', req.session);
//         req.checkBody(schema);
//         req.check('password', "Wrong password").equals(user[0].password);
//         req.getValidationResult().then((result) => {
//             try {
//                 result.throw();
//                 res.send(200, req.session.user);
//                 //res.status(200).send( req.session.user)
//                 //res.send({ success: true });
//             } catch (errors) {
//                 //req.session.errors = errors.array();
//                 res.send({ success: false });
//                 req.session.errors = null;
//             }
//         });
//     }).catch(err => {
//         res.send({ success: false, errors: 'Invalid username' });
//     });

// });

module.exports = router;

