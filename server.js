const express = require('express');
const path = require('path');
const configurator = require('./configurator');

function start(cb) {
    const paths = configurator.getProjectDirectories();
    const app = express();
    // Allow CORS
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });

    const serveProjectTarget = express.static(paths.projectTarget);

    // serve normal /pages/:app/ requests, as linked from root index
    app.use(serveProjectTarget);

    // when apps use react-router + browserHistory, full reload of sub-paths will fallback here
    app.use('/pages/:app/:rest*', function reactRouterIndexFallback(req, res, next) {
        if (req.params.rest.length) {
            req.url = `/pages/${req.params.app}/`;
        }
        serveProjectTarget(req, res, next);
    });

    app.listen(process.env.PORT || 3000, cb);
}

module.exports = {
    start: start
};
