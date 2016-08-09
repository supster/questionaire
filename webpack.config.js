const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const configurator = require('./configurator');

module.exports = function (opts) {
    var PROJECT_ROOT = configurator.getProjectDirectories().projectRoot;

    var config = {
        output: {
            filename: '[name]/app.js'
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { cacheDirectory: true }
            }, {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            }]
        },
        plugins: [ new ProgressBarPlugin() ],
        profile: true,
        resolve: {
            extensions: [ '', '.webpack.js', '.web.js', '.js', '.jsx', '.json' ],
            fallback: [
                path.join(PROJECT_ROOT, 'node_modules')
            ]
        },
        resolveLoader: {
            fallback: [
                path.join(__dirname, 'node_modules'),
                path.join(PROJECT_ROOT, 'node_modules')
            ]
        },
        progress: false
    };

    return configurator.addEntriesAndChunks(config);
};
