var gulp     = require('gulp'),
  $          = require('gulp-load-plugins')(),
  rimraf     = require('rimraf'),
  sequence   = require('run-sequence'),
  path       = require('path'),
  modRewrite = require('connect-modrewrite'),
  StreamQueue = require('streamqueue'),
  glob       = require('glob'),
  karma = require('gulp-karma'),
  karmareport = require('karma-htmlfile-reporter'),
  fileinclude = require('gulp-file-include'),
  argv = require('yargs').argv,
  fs         = require('fs'),
  header      = require('gulp-header');
  replace = require('gulp-replace-task');
  var concat = require('gulp-concat');
  
  
  
  var getReleaseVersion = function() {
	    var date=new Date();
	    function pad(num) {
	        num = num + '';
	        return num.length < 2 ? '0' + num : num;
	    }
	    return date.getFullYear() +
	        pad(date.getMonth() + 1) +
	        pad(date.getDate()) +
	        pad(date.getHours()) +
	        pad(date.getMinutes()) +
	        pad(date.getSeconds());
	}

  var baseContext = '/static';
	var appVersion = getReleaseVersion();
// 2. SETTINGS VARIABLES
// - - - - - - - - - - - - - - -
  
  var paths = {
		    styles: ['src/scss'],
		    images: ['src/assets/img'],
		    fonts: ['src/assets/fonts','font/material-design-icons']
		  },
		  bases = {
		    src: 'src/',
		    dist: 'dist/',
		    assetsCssDist : 'dist/assets/css'
		  };
  
  var libraries = [
            "bower_components/angular/angular.js",
			"bower_components/angular-ui-router/release/angular-ui-router.js",
			"bower_components/jquery/dist/jquery.js"
		];

  
  gulp.task('styles', function() {
	  return gulp.src('src/scss/**/*.scss')
	    .pipe($.sass({ style: 'expanded', }))
	    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    .pipe(gulp.dest('dist/css'))
	    .pipe($.rename({ suffix: '.min' }))
	   // .pipe($.minifycss())
	   // .pipe(livereload(server))
	    .pipe(gulp.dest('dist/css'))
	    .pipe($.notify({ message: 'Styles task complete' }));
	});
  
  
  gulp.task('scripts', function() {
	  return gulp.src(['src/bootstrap/**/*.js','src/config/**/*.js','src/component/**/*.js'])
	    //.pipe($.jshint('.jscsrc'))
	    .pipe($.jshint.reporter('default'))
	    .pipe($.concat('app.js'))
	    .pipe($.rename({ suffix: '.min' }))
//	    .pipe($.uglify())
		.pipe(replace({
			      patterns: [
			        {
			          match: 'v',
			          replacement: appVersion
			        },
			        {
			          match: 'cxt',
			          replacement: baseContext
			        }
			      ]
			    }))
	    .pipe(gulp.dest('dist/scripts'))
	    .pipe($.notify({ message: 'Scripts task complete' }));
	});
  

  gulp.task('fonts', function() {
	  return gulp.src('src/font/**/*')
	    //.pipe($.sass({ style: 'expanded', }))
	    //.pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    //.pipe(gulp.dest('dist/css'))
	    //.pipe($.rename({ suffix: '.min' }))
	   // .pipe($.minifycss())
	   // .pipe(livereload(server))
	    .pipe(gulp.dest('dist/fonts/'))
	    .pipe($.notify({ message: 'Font task complete' }));
	});

  gulp.task('libraries',['clean'], function() {
	  return gulp.src(libraries)
	    .pipe(concat('vendor.js'))
	    .pipe($.rename({ suffix: '.min' }))
	    .pipe($.uglify())
	    .pipe(gulp.dest('dist/scripts'))
//	    .pipe($.concat('vendor.js'))
//	    .pipe($.uglify())
//	    .pipe($.minify())
	    .pipe($.notify({ message: 'library task complete' }));
	});
  
  
  gulp.task('copy:html', function() {
	  return gulp.src(['index.html','src/'+ '**/*.html'])
	    //.pipe($.minifyHtml())
	  
	    .pipe(replace({
	      patterns: [
	        {
	          match: 'v',
	          replacement: appVersion
	        },
	        {
	          match: 'cxt',
	          replacement: baseContext
	        }
	      ]
	    }))
	    .pipe($.fileInclude({
	       prefix: '@@',
	       basepath: 'src/components'
	    }))
	    .pipe(gulp.dest(bases.dist))
	    .pipe($.notify({
	      message: "Copy: HTML Complete!",
	      onLast: true
	    }));
	});
  
  gulp.task('copy', function() {
	  sequence(['copy:assets', 'copy:html', 'copy:css'], function() {
	    console.log("Copy Complete!");
	  });
	});

	// Copy assets to the dist directory
	gulp.task('copy:assets', function () {
	  return gulp.src(['src/assets/**/*'])
	   .pipe(replace({
	      patterns: [
	        {
	          match: 'cxt',
	          replacement: baseContext
	        }
	      ]
	    }))
	    .pipe(gulp.dest(bases.dist + 'assets/'));

	});
	gulp.task('copy:css', function() {
		return gulp.src(['src/css/**/*'])
			.pipe(concat('vendor.css'))
			.pipe(gulp.dest(bases.dist + 'css/'));
	});
	
  gulp.task('clean', function(cb) {
	  rimraf(bases.dist, cb);
	});
  
  gulp.task('build', function() {
	  sequence('clean', ['copy:html', 'copy', 'libraries', 'scripts','fonts'], function() {
	    console.log("Successfully Built!");
	  });
	});

  gulp.task('watch', function() {
    gulp.watch(['index.html','src/'+ '**/*.html'], ['copy:html']);
    gulp.watch(['src/bootstrap/**/*.js','src/config/**/*.js','src/component/**/*.js'], ['scripts']);
     
});
  
  gulp.task('default', ['build']);