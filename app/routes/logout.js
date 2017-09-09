import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    req.session.destroy();
    res.status(200).send({ logged: false });
});

module.exports = router;