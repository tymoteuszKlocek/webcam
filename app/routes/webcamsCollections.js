const express = require('express');

const router = express.Router();
const models = require('../models');

/* GET user collectoins. */
router.get('/', function (req, res) {

    if (!req.session.user) {
        return res.status(401).send();
    }

    models.WebcamsCollections.findAll({ where: { userID: req.session.user.id } })
        .then(collections => {
            res.status(200).send(collections);
        }).catch(function (erroror) {
            res.status(200).send(erroror);
        });
});

/* DELETE user collectoin */
router.delete('/', function (req, res) {
    
    if (!req.session.user) {
        return res.status(401).send();
    }

    models.WebcamsCollections.findOne({
        where: { 
            title: req.body.title 
        }
    }).then(collection => {
        collection.destroy({
            where: {
                title: req.body.title
            }
        });
        res.status(200).send();
    }).catch(function (error) {
        res.status(200).send(error);
    });
});

module.exports = router;