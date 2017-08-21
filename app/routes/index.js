var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('I send some data');
    res.send('data from index');
    next();
});

module.exports = router;
