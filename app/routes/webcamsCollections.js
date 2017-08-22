const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {

    models.WebcamsCollections.findAll()
    .then(collection => {
        console.log('Collection: ', collection)
        res.send(200, collection);
    }).catch(function(err) {
        // print the error details
        console.log(err);
    });

});

router.put('/', function (req, res, next) {

    console.log('opt from bb', req);

    models.WebcamsCollections.findOrCreate({
        title: req.body.title
    }).then(resp => {
        console.log('Collections created', resp)
        res.send(200, resp);
    }).catch(function(err) {
        // print the error details
        console.log(err);
    });
});

module.exports = router;