// module dependencies
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import * as fs from 'fs';

// models
import models from './models';

// routes
import index from './routes/index';

// config
const configJson = fs.readFileSync('./config/config.json');
const config = JSON.parse(configJson);

const app = express();
const port = normalizePort(process.env.PORT || '3000');

// CORS
const allowCrossDomain = (req,res,next) => {
    let allowedHost = [config.cors.origin];

    if(allowedHost.indexOf(req.headers.origin) !== 1) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', config.cors.origin);
        res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Auth-Token');
        next();
    } else {
        res.status(401).send();
    }
};

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(allowCrossDomain);
// session
app.use(session(config.sess));

// routes
app.use('/', index);

// Get port from environment and store in Express.
app.set('port', port);

// Create HTTP server.
let server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);

// sequelize sync
models.sequelize.sync().then( () => {
    server.listen(port);
});

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

module.exports = app;
