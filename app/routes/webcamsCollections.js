const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {

    models.WebcamsCollections.findAll()
    .then(collections => {
        res.send(200, collections);
    }).catch(function(err) {
        console.log(err);
    });
});

router.post('/', function (req, res, next) {

    console.log('req from collections', req.body);

    models.WebcamsCollections.findOrCreate({
        title: req.body.title
    }).then(resp => {
        console.log('Collections created', resp)
        res.send(200, resp);
    }).catch(function(err) {
        console.log('Collections not created', err);
    });
});

module.exports = router;