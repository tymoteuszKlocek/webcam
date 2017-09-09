// module dependencies
import express from 'express';
import http from 'http';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import models from './models';
// routes
import index from './routes/index';
import login from './routes/login';
import logout from './routes/logout';
import register from './routes/register';
import webcams from './routes/webcams';
import webcamsCollections from './routes/webcamsCollections';

const app = express();
const port = normalizePort(process.env.PORT || '3000');
let sess = {
    secret: 'tymonolololo',
    saveUninitialized: true,
    resave: false,
};

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Auth-Token');
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
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/collections', requireLogin, webcamsCollections);
app.use('/webcams', requireLogin, webcams);
app.use('/webcams/:id', requireLogin, webcams);

// when page refresh in browser check the access
app.post('/refresh', (req, res) => {

    if (!req.session.user) {
        return res.status(401).send({ msg: 'Please login' });
    } else {
        return res.status(200).send({ success: true, username: req.session.user.username });
    }
});

// sequelize sync
models.sequelize.sync().then( () => {
    server.listen(port);
});


// Get port from environment and store in Express.
app.set('port', port);


// Create HTTP server.
let server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);


// Normalize a port into a number, string, or false.
function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


// catch 404 and forward to error handler
app.use( (req, res) => {
    let err = new Error('Not Found');
    err.status = 404;
    res.status(err.status || 500).send();
});

// check if user is logged in and has session
function requireLogin(req, res, next) {
    if (req.session.id) {
        return next();
    } else {
        return res.status(401).send({ msg: 'Looks like you are logout' });
    }
}

module.exports = app;
