var express = require('express');
var router = express.Router();

/* GET webcams. */
router.get('/webcams', function (req, res, next) {
    debuger;
    res.type(text/html);
    res.status(200);
    res.send(<p>HELLO F#$%!</p>);
    console.log('I send some data');
    res.send('data from webcams');
});

module.exports = router;
