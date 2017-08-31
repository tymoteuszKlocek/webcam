const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function (req, res, next) {
    console.log('webcam coll id', req.query);
    if (!req.session.user) {
        return res.status(401).send();
    }
    req.session.collectionID = req.id;
    models.Webcams.findAll({
        where: {
            collectionID: req.query.id
        }
    }).then(collection => {
        res.send(200, collection);
    }).catch(function (err) {
        // print the error details
        console.log(err);
    });

});

// router.put('/', function (req, res, next) {
//     if (!req.session.user) {
//         return res.status(401).send();
//     }

//     models.Webcams.create({ where: { collectionID: req.body.collectionID, userID: req.session.user.id } })
//         .spread((collection, created) => {
//             if (created) {
//                 res.status(200).send(created);
//             } else {
//                 var msg = !created;
//                 res.status(200).send(msg);
//             }
//         }).catch(function (err) {
//             console.log(err);
//         });
// });

router.put('/', function (req, res, next) {
    console.log('webcam session id', req.session.id);
    if (!req.session.user) {
        return res.status(401).send();
    }
    models.Webcams.create(req.body).then(resp => {
        console.log(', I created webcam');
        res.status(200).send();
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
        res.status(200).send();
    }).catch(function (err) {
        // print the error details
        console.log(err.errors);
    });;
});

module.exports = router;