import express from 'express';

// routes
import user from './user';
import webcams from './webcams';
import webcamsCollections from './webcamsCollections';

const router = express.Router();

router.use('/', user);
router.use('/webcamcollections', requireLogin, webcamsCollections);
router.use('/webcams', requireLogin, webcams);
router.use('/webcams/:id', requireLogin, webcams);

// simple browser refresh mechanism
router.post('/refresh', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({ msg: 'Please login' });
    } else {
        return res.status(200).send({ success: true, username: req.session.user.username });
    }
});

// check if user is logged in and has session
function requireLogin(req, res, next) {
    if (req.session.id) {
        return next();
    } else {
        return res.status(401).send({ msg: 'Looks like you are loged out' });
    }
}

module.exports = router;
