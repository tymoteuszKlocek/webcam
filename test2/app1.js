var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require('./models');
//var requestCORSChecker = require('./middleware/middleware');

//routes in separate files (what is best practice?)
var routes = require('./routes');
//var users = require('routes/users');

var app = express();
// my midedleware test
//app.use();

app.get('/webcams', function (req, res, next) {
    console.log('webcams works - router')
    res.send('hello expres')
    //app.use(routes.index);
    res.end();
});

app.get('/qwerty', function (req, res, next) {
    console.log('webcams works - router')
    res.send('hello expres');
    
    //app.use(routes.index);
    //res.end();
});
// app.get('/webcams', function (req, res) {
//     app.use(routes.webcams);
// });
// app.get('/', function (req, res) {
//     console.log('index.html is here: ');
//     res.send('Hello World!')
// });

// app.get('/#/list-of-my-webcams', function (req, res) {
//     console.log('list-of-my-webcams is here: ');
//     res.send('Hello World! /webcams list');
//     requestCORSChecker.allowCrossDomain(req, res, next).then(function() {
//         console.log(12121212);
//         res.send('Hello World! /webcams');
//     })
//     // models.Webcams.findAll().then(function (webcams) {
//     //     res.send('Hello World! /webcams');
//     // })
// });

// app.get('/webcams', function (req, res) {
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     console.log('webcams is here:');
//     res.send('Hello World webcams!' )
// });

// app.post('/webcams', function (req, res) {
//     console.log(req.body);
//     //models.Webcams.create({webcam: req.body})
//     // .then(function() {
//     //     console.log('webcam saved');
//     //     //res.send('Got a POST request');
//     // })
    
// });

// app.put('/webcams', function (req, res) {
//     console.log(req.body);
// });

// app.delete('/webcams/:webcamId', function (req, res) {

//     res.send('Got a DELETE request at webcam with ID: ' + req.param);

// });

// this I will use later for user
// app.get('/users/:userId/webcams/:webcamCollectionTitle', function (req, res) {
//   console.log(req.params);
//   res.send(req.params)
// })


//app.set('view engine', 'jade');
//app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static('index.html'));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;
