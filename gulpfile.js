'use strict';
const gulp = require('gulp');
const path = require('path');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const configurator = require('./configurator');

const mocha = require('gulp-mocha');
const babel = require('babel-core/register');

const paths = configurator.getProjectDirectories();
const generateWebpackConfig = require('./webpack.config');
const server = require('./server');
const plumber = require('gulp-plumber');
const mkdirp = require('mkdirp');
const fs = require('fs');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

/**
 * Webpack build task.
 */
gulp.task('watch-webpack', function () {
    const webpackConfig = generateWebpackConfig();
    webpackConfig.watch = true;
    return gulp.src('')
        .pipe(webpackStream(webpackConfig, webpack, function (err, stats) {
            gutil.log(stats.toString({
                colors: gutil.colors.supportsColor,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false,
                modules: false,
                children: true,
                version: true,
                cached: false,
                cachedAssets: false,
                reasons: false,
                source: false,
                errorDetails: false
            }));
            const buildRoot = path.join(paths.projectRoot, 'build');
            mkdirp.sync(buildRoot);
            fs.writeFile(path.join(buildRoot, 'stats.json'), JSON.stringify(stats.toJson()));
        }))
        .on('error', function (e) {
            console.log('webpack err', e);
            process.exit(1);
        })
        .pipe(gulp.dest(paths.projectTarget));
});

/**
 * Webpack build directly to target.
 */
gulp.task('build-webpack', function () {
    const webpackConfig = generateWebpackConfig();
    return gulp.src('')
        .pipe(plumber())
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(paths.projectTarget));
});

/**
 * Watch SASS files.
 */
gulp.task(`watch-sass`, function () {
    gulp.watch(path.join(paths.src, '**/*.scss'), ['build-sass']);
});
/**
 * Compile SASS files.
 */
gulp.task('build-sass', function () {
    return gulp.src(path.join(paths.src, '**/*.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(rename((filepath) => {
            filepath.dirname = filepath.dirname.replace(/\/scss$/, '/css');
        }))
        .pipe(gulp.dest(paths.projectTarget));
});

/**
 * Test watcher.
 */
const MOCHA_NAME = `test-mocha`;

/**
 * Run mocha tests.
 */
gulp.task(MOCHA_NAME, function () {
    // avoid complications when automation sets NODE_ENV to "production"
    const NODE_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test';

    return gulp.src(paths.allTests, { read: false })
        .pipe(mocha({
            compilers: {
                js: babel
            },
            reporter: (gutil.env.v || gutil.env.verbose) ? 'list' : 'dot',
            grep: gutil.env.grep ? gutil.env.grep : null
        }))
        .on('error', function (err) {
            if (!failOnError) {
                // Eat the error
                gutil.log(MOCHA_NAME, err);
                this.emit('end');
            }
        })
        .on('end', function () {
            process.env.NODE_ENV = NODE_ENV;
        });
});


gulp.task(`watch-test`, function () {
  gulp.watch(paths.allTests, [MOCHA_NAME]);
});

/**
 * Test rollup task.
 */
gulp.task('test', function (callback) {
    runSequence(MOCHA_NAME, callback);
});
/**
 * Watcher rollup.
 */
gulp.task('watch', [
  'watch-webpack',
  'watch-test',
  'watch-sass'
]);

gulp.task('server', function (done) {
    server.start(done);
});
/**
 * Builds, starts a development server, and watches changes.
 */
gulp.task('run', (callback) => {
  runSequence(
      'test',
      'build-webpack',
      'build-sass',
      'server',
      'watch',
      callback
  );
});

/**
 * Default task, build.
 */
gulp.task('default', [ 'run' ]);