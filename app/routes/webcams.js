const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function (req, res, next) {
    if (!req.session.user) {
        return res.status(401).send();
    }
    req.session.collectionID = req.id;
    models.Webcams.findAll({
        where: {
            collectionID: req.query.id
        }
    }).then(collection => {
        res.status(200).send(collection);
    }).catch(function (error) {
        res.status(200).send({error: error});
    });

});

router.put('/', function (req, res, next) {
    if (!req.session.user) {
        return res.status(401).send();
    }
    models.Webcams.create(req.body).then(resp => {
        res.status(200).send();
    }).catch(function (error) {
        res.status(200).send({error: error});
    });
});

router.delete('/', function (req, res, next) {
    console.log(req.query.id)
    models.Webcams.findAll({
        where: {
            collectionID: req.session.collectionID
        }
    }).then(webcam => {
        webcam.destroy({
            where: {
                id: req.query.id
            }
        })
        res.status(200).send({msg: 'Webcam deleted!'});
    }).catch(function (error) {
        res.status(200).send({error: error});
    });;
});

module.exports = router;