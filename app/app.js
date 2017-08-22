var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var webcams = require('./routes/webcams');
var webcamsCollections = require('./routes/webcamsCollections');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/webcams', webcams);
app.use('/webcams/:id', webcams);
app.use('/users', users);
app.use('/webcams-collections', webcamsCollections);
//app.use('8080/#/list-of-my-webcams', webcams);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.get('/qwerty', function (req, res, next) {
    console.log('webcams works - router')
    res.send('hello qwerty');

    //app.use(routes.index);
    res.end();
});

app.post('/webcams', function (req, res) {
    console.log(req.body);
    //models.Webcams.create({webcam: req.body})
    // .then(function() {
    //     console.log('webcam saved');
    //     //res.send('Got a POST request');
    // })

});

app.put('/webcams', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send(200);
    console.log(req.body);
    //models.Webcams.create({webcam: req.body})
    // .then(function() {
    //     console.log('webcam saved');
    //     //res.send('Got a POST request');
    // })

});

module.exports = app;
