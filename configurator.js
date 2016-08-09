'use strict';
var path = require('path');
var glob = require('glob');
var _ = require('lodash');

var CHUNKS_KEY = 'commonChunks';
var COMMONS_NAME = 'overall-commons.js';
var SRC_DIR = path.normalize(path.join(process.cwd(), 'src/'));
var TARGET_DIR = path.normalize(path.join(process.cwd(), 'target/'));
var CONFIG_NAME = 'app.config';

/**
 * Get stats from the app.config.json file.
 */
function getStats(fileName, replaceDir) {
    var config = _.cloneDeep(require(fileName)),
        dirname = path.dirname(fileName),
        name = dirname.replace(replaceDir, ''),
        entry = config.entry || 'app.js';

    if (!name.match(/^[a-zA-z-/]*$/)) {
        console.log(`Warning: the path to ${name} contains invalid characters.`);
        console.log('Allowed characters are A-Z, a-z, "/", and "-"');
    }
    return {
        // The application config
        config: config,
        // Name of the application (folder path)
        name: name,
        // Relative path to the app.js file
        path: path.join(name, entry),
        // File path to the app.js file
        filePath: path.join(dirname, entry)
    };
}


function getProjectName(givenOpts) {
    let opts = givenOpts || {};
    let name = require(path.join(process.cwd(), 'package.json')).name;
    if (opts.camel) {
        name = _.camelCase(name);
    }
    return name;
}

function getProjectDirectories() {
    var target = TARGET_DIR;
    var projectTarget = path.join(TARGET_DIR, getProjectName());
    var projectRoot = path.normalize(path.join(process.cwd()));
    var src = path.join(projectRoot, 'src');
    var test = path.join(projectRoot, 'test');

    var allJs = [
        path.join(src, '**/*.js'),
        path.join(src, '**/*.jsx'),
        path.join(projectRoot, '*.js'),
        path.join(test, '**/*.js')
    ];

    var coverage = [
        path.join(src, '**/*.js'),
        path.join(src, '**/*.jsx'),
        '!' + path.join(src, '**/test/**/*'),
        '!' + path.join(src, '**', '*-test.js')
    ];

    var allTests = [
        path.join(test, '**/*-test.js'),
        path.join(src, '**/*-test.js')
    ];

    var configsRelative = `**/${CONFIG_NAME}.{json,js}`;

    return {
        src,
        target,
        projectTarget,
        projectRoot,
        allTests,
        allJs,
        configsRelative
    }
}

function getAllConfigStats(dir) {
    const paths = getProjectDirectories();
    if (dir === undefined) { dir = 'src' }
    let directory = { src: SRC_DIR, target: paths.projectTarget + '/' }[dir];
    if (directory === undefined) {
        console.log("'getAllConfigStats', 'expected of of ['src', 'target'] but got", dir);
        directory = dir;
    }

    const files = glob.sync(path.join(directory, paths.configsRelative));
    return files.map((file) => getStats(file, directory));
}

/**
 * Updates the given webpack config with entries and chunks based on app.config.json
 *
 * The set of apps included can be limited by the environment variable BRAAVOS_BUILD_SUBSET.
 * This variable is treated as a regex.
 */
function addEntriesAndChunks(webpackConfig, addChunks) {
    /**
     * Find all config files in the given directory, generating an object mapping chunk
     * name to apps that should be in that chunk. Also tracks a list of apps in no chunk
     * (other than the implicit overall commons chunk)
     */
    var chunks = {};
    var chunkless = [];
    getAllConfigStats().forEach(function (stats) {
        var entry = { [stats.name]: stats.filePath };

        var subsetRegex = new RegExp(process.env.BRAAVOS_BUILD_SUBSET);
        if ((subsetRegex && subsetRegex.test(stats.name)) || !subsetRegex) {
            webpackConfig.entry = Object.assign({}, webpackConfig.entry, entry);
        }

        if (stats.config[CHUNKS_KEY] && stats.config[CHUNKS_KEY].length > 0) {
            stats.config[CHUNKS_KEY].forEach(function (chunk) {
                if (!chunks[chunk]) {
                    chunks[chunk] = [];
                }
                chunks[chunk].push(stats.name);
            });
        } else if (stats.config[CHUNKS_KEY] !== false) {
            chunkless.push(stats.name);
        }
    });

    if (!webpackConfig.plugins) {
        webpackConfig.plugins = [];
    }

    /**
     * Given the generated mapping of chunks, add CommonsChunkPlugin(s) for each one.
     * For webpack to work properly, the overall commons chunk must contain only the apps
     * that are part of no chunks and the chunks.
     */
    if (addChunks) {
        Object.keys(chunks).forEach(function (chunk) {
            webpackConfig.plugins.push(new CommonsChunkPlugin({
                name: chunk,
                filename: chunk + '.js',
                chunks: chunks[chunk]
            }));
        });

        webpackConfig.plugins.push(new CommonsChunkPlugin({
            name: COMMONS_NAME,
            chunks: chunkless.concat(Object.keys(chunks)),
            filename: COMMONS_NAME
        }));
    }

    return webpackConfig;
}


module.exports = {
    getProjectName,
    getProjectDirectories,
    addEntriesAndChunks
};