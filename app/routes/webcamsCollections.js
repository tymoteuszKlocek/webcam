const express = require('express');

const router = express.Router();
const models = require('../models');

/* GET user collections. */
router.get('/', function (req, res) {

    models.WebcamsCollections.findAll({
        where: {
            UserId: req.session.user.id
        }
    }).then(collections => {
        res.status(200).send(collections);
    }).catch(function (error) {
        res.status(200).send(error);
    });
});

/* CREATE user collection */
router.put('/', function (req, res) {

    models.WebcamsCollections.findOrCreate({
        where: {
            title: req.body.title,
            UserId: req.session.user.id
        }
    }).then(() => {
        return res.status(200).send({ success: true, msg: 'New collection created or it already exists.' });
    }).catch(error => {
        return res.status(200).send({ success: false, msg: error });
    });
});

/* DELETE user collection */
router.delete('/', function (req, res) {

    models.WebcamsCollections.findOne({
        where: {
            UserId: req.session.user.id,
            title: req.body.title,
            id: req.body.id
        }
    }).then(collection => {
        collection.destroy();
    }).catch(function (error) {
        res.status(200).send(error);
    });

});

module.exports = router;