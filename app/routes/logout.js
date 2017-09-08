const express = require('express');

const router = express.Router();

router.post('/', function (req, res) {
    req.session.destroy();
    res.status(200).send({ logged: false });
});

module.exports = router;