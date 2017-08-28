const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log('req.session', req.session);
    console.log('req.session.userID 1', req.session.userID);
    if(req.session.userID) {
        models.WebcamsCollections.findAll()
        .then(collections => {
            res.send(200, collections);
        }).catch(function (err) {
            console.log(err);
        });
    }
    res.send(200);
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    models.WebcamsCollections.findOrCreate({
        title: req.body.title
    }).then(resp => {
        console.log('Collections created', resp)
        res.send(200, resp);
    }).catch(function (err) {
        console.log('Collections not created', err);
    });
});

router.delete('/', function (req, res, next) {
    console.log('req TITLE', req.body.title)
    models.WebcamsCollections.findOne({
        where: { title: req.body.title }
    }).then(collection => {
        collection.destroy({
            where: {
                title: req.body.title
            }
        });
        res.send(200);
    }).catch(function (err) {
        console.log(err);
    });
});

module.exports = router;