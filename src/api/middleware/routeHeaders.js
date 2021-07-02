const { allowedOrigins } = require('../../util/config');

module.exports.headerMiddleware = function (req, res, next) {
    const { origin } = req.headers;
    
    if (allowedOrigins.includes(origin)) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', origin);
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    }

    // Pass to next layer of middleware
    next();
};