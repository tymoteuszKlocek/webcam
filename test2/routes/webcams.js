var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
    models.Webcams.findAll().then(function (resp) {
        res.send('respond with a resource' + JSON.stringify(resp));
    })
});

router.put('/', function (req, res, next) {
    console.log(req.body)
    models.Webcams.create(req.body).then(function(resp) {
        console.log('ok');

        res.send(200, resp);
    });
});

// fake webcam data
// router.put('/', function (req, res, next) {
//     models.Webcams.create( {"slug": "my-slug2", "city":"Vancouver","country":"Canada","countryCode":"CA","views":1161218,"lat":49.276268,"lng":-123.133307,"type":"scanner","title":"Vancouver: English Bay","id":"1165421984","state":"scanner"})    
// });

// example of data in json:
//"{"city":"Vancouver","country":"Canada","countryCode":"CA","views":1161218,"lat":49.276268,"lng":-123.133307,"position":"49.276,-123.133","thumbnail":"https://images.webcams.travel/preview/1165421984.jpg","type":"scanner","title":"Vancouver: English Bay","link":"https://www.webcams.travel/webcam/1165421984-Weather-Vancouver-Downtown-2-Vancouver","id":"1165421984","state":"scanner"}"

module.exports = router;