module.exports = function () {
    var allowedHost = {
        'http://localhost:8080': true
    };

    var allowCrossDomain = function (req, res, next) {
        if (allowedHost[req.headers.origin]) {
            console.log('domain ok');
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Origin', req.headers.origin)
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
            next();
        } else {
            res.send(403, { auth: false });
        }
    }
};