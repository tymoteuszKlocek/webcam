const express = require('express');

const router = express.Router();
const models = require('../models');

router.put('/', function (req, res) {

    if (!req.session.user) {
        return res.status(401).send();
    }

    models.WebcamsCollections.findOrCreate({
        where: {
            title: req.body.title,
            userID: req.session.user.id
        }
    }).spread((collection, created) => {
        if (created) {
            res.status(200).send({ success: true, msg: 'New collection created.' });
        } else {
            res.status(200).send({ success: false, error: 'Collection already exists.' });
        }
    }).catch(function (error) {
        res.status(200).send({ success: false, error: error });
    });
});

module.exports = router;
