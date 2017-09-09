import express from 'express';
import models from '../models';

const router = express.Router();

/* GET user collections. */
router.get('/', (req, res) => {

    models.WebcamsCollections.findAll({
        where: {
            UserId: req.session.user.id
        }
    }).then(collections => {
        res.status(200).send(collections);
    }).catch((error) => {
        res.status(200).send(error);
    });
});

/* CREATE user collection */
router.put('/', (req, res) => {

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
router.delete('/', (req, res) => {

    models.WebcamsCollections.findOne({
        where: {
            UserId: req.session.user.id,
            title: req.body.title,
            id: req.body.id
        }
    }).then(collection => {
        collection.destroy();
    }).catch((error) => {
        res.status(200).send(error);
    });

});

module.exports = router;