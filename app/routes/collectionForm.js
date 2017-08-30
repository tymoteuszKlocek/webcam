const express = require('express');
const router = express.Router();
const models = require('../models');

router.put('/', function (req, res, next) {
    if(!req.session.user) {
        return res.status(401).send();
    }
    models.WebcamsCollections.findOrCreate({ where: { title: req.body.title, userID: req.session.user.id } })
        .spread((collection, created) => {
            if (created) {
                res.status(200).send(created);
            } else {
                var msg = !created;
                res.status(200).send(msg);
            }
        }).catch(function (err) {
            console.log(err);
        });
});

module.exports = router;
