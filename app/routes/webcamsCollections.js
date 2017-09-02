const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET user collectoins. */
router.get('/', function (req, res, next) {

    if (!req.session.user) {
        return res.status(401).send();
    }

    models.WebcamsCollections.findAll({ where: { userID: req.session.user.id } })
        .then(collections => {
            res.status(200).send(collections);
        }).catch(function (err) {
            console.log(err);
            res.status(200).send(err);
        });
});

/* DELETE user collectoin */
router.delete('/', function (req, res, next) {
    
    if (!req.session.user) {
        return res.status(401).send();
    }

    models.WebcamsCollections.findOne({
        where: { title: req.body.title }
    }).then(collection => {
        collection.destroy({
            where: {
                title: req.body.title
            }
        });
        res.status(200).send();
    }).catch(function (err) {
        console.log(err);
        res.status(200).send(err);
    });
});

module.exports = router;