const express = require('express');

const router = express.Router();
const models = require('../models');

router.get('/', function (req, res, next) {

    if (!req.session.user) {
        return res.status(401).send();
    }
    
    req.session.collectionID = req.body.id;

    models.Webcams.findAll({
        where: {
            collectionID: req.query.id
        }
    }).then(collection => {
        res.status(200).send(collection);
    }).catch(function (error) {
        res.status(200).send({ error: error });
    });

});

router.get('/:id', function (req, res) {
    
    if (!req.session.user) {
        return res.status(401).send();
    }

    req.session.collectionID = req.params.id;
    
    models.Webcams.findAll({
        where: {
            collectionID: req.params.id
        }
    }).then(collection => {
        res.status(200).send(collection);
    }).catch(function (error) {
        res.status(200).send({ error: error });
    });
    
});

router.put('/', function (req, res) {

    if (!req.session.user) {
        return res.status(401).send();
    }

    models.Webcams.find({
        where: {
            webcamID: req.body.webcamID,
            $and: [
                { collectionID: req.body.collectionID }
            ]
        }
    }).then((webcam) => {
        if (webcam) {
            res.status(200).send({ success: false, error: 'Webcam already saved in this collection.' });
        } else {
            models.Webcams.create(req.body).then(() => {
                res.status(200).send({ success: true, msg: 'New webcam saved.' });
            });
        }
    }).catch(function (error) {
        res.status(200).send({ success: false, error: error });
    });
});

router.delete('/', function (req, res) {

    if (!req.session.user) {
        return res.status(401).send();
    }
    
    models.Webcams.findOne({
        where: {
            collectionID: req.body.collectionID,
            id: req.body.id
        }
    }).then(webcam => {
        webcam.destroy().then(resp => {
            res.status(200).send({ success: true, msg: 'Webcam deleted!' });
        });
    }).catch(function (error) {
        res.status(200).send({ success: false, error: error });
    });
});

module.exports = router;