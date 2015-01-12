'USe strict';

var gulp = require('gulp')
	, gutil = require('gulp-util')
	, source = require('vinyl-source-stream')
	, watchify = require('watchify')
	, browserify = require('browserify')
	, watchLess = require('gulp-watch-less')
	, less = require('gulp-less')
	, path = require('path');


var JS_ROOT = "./templates/js";
function js_resolve (f) {
	return path.join( JS_ROOT, f )
}

var bundler = watchify(
	browserify(
		'foo.js'
		, {
			src: ['templates/js/*.js', 'templates/js/**/*.js'],
			extensions: ['.js'],
			paths: ['./templates/js', './public/dist/', './templates/js/bower_components' ],
			debug: true,
			insertGlobals: true,
			cache: {}, packageCache: {}, fullPaths: true
		}
	)
);
bundler.on('update', function (ids) { console.log(ids); bundle() } );

	
function bundle() {
	console.log('good');
	gutil.log.bind(gutil, 'Good');
	return bundler.bundle()
		// log errors if they happen
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./public/dist/'))
}

gulp.task('watch', bundle);
gulp.task('default', [ 'watch']);
