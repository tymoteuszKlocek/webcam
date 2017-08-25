const express = require('express');
const router = express.Router();
const models = require('../models');

router.put('/', function (req, res, next) {
    models.WebcamsCollections.findOrCreate({ where: { title: req.body.title } })
        .spread((collection, created) => {
            console.log(collection.get({
                plain: true
            }))
            if (created) {
                res.send(200, created);
            } else {
                var msg = !created;
                res.send(200, msg);
            }
        }).catch(function (err) {
            console.log(err);
        });
});

module.exports = router;
