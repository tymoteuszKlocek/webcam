const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function (req, res, next) {
    console.log('session id: ', req.session.id);
    models.Session.findOne({ where: { sessionID: req.session.id }, raw: true }).then(session => {
        console.log('you fiund session', session)
        return res.status(200).send(session);
    });
    res.status(200).send(req.session.id);
});

router.put('/', function (req, res, next) {
    console.log('req from session login: ', req.body)
    models.User.findOne({ where: { id: req.body.userID }, raw: true }).then(user => {
        console.log('user', user)
        if (!user) {
            return res.status(404).send({ msg: "User not found. Create account." });
        }
        if (user) {
            console.log('req.body.userID', req.body.userID);
            models.Session.create({ sessionID: req.body.userID, userID: req.body.userID }).then((resp) => {
                res.status(200).send({ success: true, sessionID: req.session.id, userID: user.id });
            })
        }
    });
});


module.exports = router;