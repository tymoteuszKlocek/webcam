var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var Sequelize = require('sequelize');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var sqlite3 = require('sqlite3').verbose();

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var webcams = require('./routes/webcams');
var webcamsCollections = require('./routes/webcamsCollections');
var collectionForm = require('./routes/collectionForm');

var sequelize = new Sequelize(
    "webcams-test",
    "tymoteusz",
    "tymoteusztymoteusz1", {
        "dialect": "sqlite",
        "storage": "./session.sqlite"
    });

var sess = {
    secret: 'tymonolololo',
    saveUninitialized: true,
    resave: false,
};

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Auth-Token");
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session(sess));

// routes
app.use('/', index);
app.use('/login', login);
app.use('/webcams',  requireLogin, webcams);
app.use('/webcams/:id',  requireLogin, webcams);
app.use('/register', register);
app.use('/collections', requireLogin, webcamsCollections);
app.use('/create-collection', requireLogin, collectionForm);

app.post('/logout', function(req, res) {
    req.session.destroy();
    res.status(200).send({logged: false});
  });

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

function requireLogin(req, res, next) {
    console.log(req.session.id)
    // if (!req.session.user) {
    //     return res.status(401).send({Msg: "you must login"});
    // }
    next();
};

module.exports = app;
