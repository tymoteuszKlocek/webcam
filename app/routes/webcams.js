const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function (req, res, next) {
    models.Webcams.findAll()
        .then(collection => {
            res.send(200, collection);
        }).catch(function (err) {
            // print the error details
            console.log(err);
        });

});

router.put('/', function (req, res, next) {
    models.Webcams.create(req.body).then(resp => {
        console.log(', I created webcam');
        res.send(200, resp.body);
    }).catch(function (err) {
        // print the error details
        console.log(err);
    });
});

router.delete('/', function (req, res, next) {
    models.Webcams.findAll().then(all => {
        all.destroy({
            where: {
                id: 1
            }
        })
        res.sendStatus(200).send(body);
    }).catch(function (err) {
        // print the error details
        console.log(err.errors);
    });;
});

module.exports = router;