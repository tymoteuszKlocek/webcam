import express from 'express';
import models from '../models';

const router = express.Router();

router.get('/:id', (req, res) => {

    req.session.collectionID = req.params.id;

    models.Webcams.findAll({
        where: {
            userID: req.session.user.id,
            $and: [
                { collectionID: req.params.id }
            ]
        }
    }).then(collection => {
        res.status(200).send(collection);
    }).catch( (error) => {
        res.status(200).send({ error: error });
    });

});

router.put('/', (req, res) => {

    models.Webcams.find({
        where: {
            webcamID: req.body.webcamID,
            $and: [
                { collectionID: req.body.collectionID },
                { userID: req.session.user.id }
            ]
        }
    }).then((webcam) => {

        if (webcam) {

            res.status(200).send({ success: false, error: 'Webcam already saved in this collection.' });

        } else {

            models.Webcams.create({
                city: req.body.city,
                country: req.body.country,
                countryCode: req.body.countryCode,
                views: req.body.views,
                lat: req.body.lat,
                lng: req.body.lng,
                position: req.body.position,
                thumbnail: req.body.thumbnail,
                type: req.body.type,
                title: req.body.title,
                link: req.body.link,
                webcamID: req.body.webcamID,
                collectionID: req.body.collectionID,
                userID: req.session.user.id
            }).then(() => {

                res.status(200).send({ success: true, msg: 'New webcam saved.' });

            });
        }
    }).catch( (error) => {
        res.status(200).send({ success: false, error: error });
    });
});

router.delete('/', (req, res) => {

    models.Webcams.findOne({
        where: {
            collectionID: req.body.collectionID,
            id: req.body.id
        }
    }).then(webcam => {

        webcam.destroy().then(() => {
            res.status(200).send({ success: true, msg: 'Webcam deleted!' });
        });

    }).catch( (error) => {
        res.status(200).send({ success: false, error: error });
    });
});

module.exports = router;