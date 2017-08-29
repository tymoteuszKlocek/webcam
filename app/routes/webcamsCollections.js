const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
    // console.log('req.session from webcamsCol', req.session);
    // console.log('req', req.session.id);
    if(req.session.id) {
        models.WebcamsCollections.findAll()
        .then(collections => {
            res.status(200).send(collections);
        }).catch(function (err) {
            console.log(err);
        });
    }
    res.status(401);
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