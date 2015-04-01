var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
	pkg = require('./package.json'),
	common = require('./gulp/common.js'),
	// sass = require('gulp-ruby-sass'),
	// plumber = require('gulp-plumber'), keep gulp running w/o pulmber
	livereload = require('gulp-livereload'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify'),
	prefix = require('gulp-autoprefixer');	//browser prefix
	del = require('del');

var plug = 	plug = require('gulp-load-plugins')();
var env = plug.util.env;
var log = plug.util.log;	

function errorLog(error){
	console.error.bind(error);
	this.emit('end');
}

gulp.task('ngAnnotateTest', function(){
	log("Annotating AngularJS dependencies");
	var source =[].concat(pkg.paths.js);
	return gulp
		// .src(source)
		.src('./client/app/avengers/avengers.js')
		.pipe(plug.ngAnnotate({add: true, single_quotes: true}))
		.pipe(plug.rename(function(path){
			path.extname = '.annotated.js';
		}))
		.pipe(gulp.dest('./client/app/avengers'));
});

/** 
 * @desc Minify and bundle the app's js
 */
 gulp.task('js', ['jshint','templatecache'], function(){
 	var source = [].concat(pkg.paths.js, pkg.paths.stage +'templatecache');
 	return gulp
 		.src(source)
 		.pipe(plug.sourcemaps.init())
 		.pipe(plug.concat('all.min.js'))
 		.pipe(plug.ngAnnotate({add: true, single_quotes: true}))
 		.pipe(plug.bytediff.start())
 		.pipe(plug.uglify({mangle:true}))
 		.pipe(plug.bytediff.stop(common.bytediffformatter))
 		.pipe(plug.sourcemaps.write('./'))
 		.pipe(gulp.dest(pkg.paths.stage));
 });

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))    
    .pipe(concat('main.js'))	// concatenates all the files into a single file named main.js
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task(jshint, function(){
	log('Creating an AngularJS $templateCache');
	return gulp
		.src(pkg.paths.htmltempaltes)
		.pipe(plug.angularTemplatecache('templates.js', {
			module: 'app.core',
			standalone: false,
			root: 'app/'
		}))
		.pipe(gulp.dest(pkg.paths.stage));
});

gulp.task('fonts', function(){
	var dest = pkg.paths.stage + 'fonts';
	log(Copying fonts);
	return gulp
		.src(pkg.paths.fonts)
		.pipe(gulp.dest(dest)
});

// Scripts Task
gulp.task('task1', function(){
	gulp.src('js/my*.js')
		//.pipe(plumber())
		.pipe(uglify())
		.on('error', errorLog)
		.pipe(gulp.dest('minijs'))
});

gulp.task('styles', function(){
	gulp.src('scss/**/*.scss')
		//.pipe(plumber())
		.pipe(sass({style: 'compressed'}))
		.on('error', errorLog)
		.pipe(autoprefixer('last 2 versions', '> 5%'))	// i may not need this
		.pipe(gulp.dest('css/'))
		.pipe(livereload);	
});

gulp.task('minicss', function(){
	log('compressing, bundling, complying vendor CSS');
	return gulp
		.src(pkg.paths.vendrorcss)
		.pipe(plug.concat('vednor.min.css'))
		.pipe(plug.bytediff.start())
		.pipe(plug.minifycss({}))
		.pipe(plug.bytediff.stop(common.bytediffformatter))
		.pipe(gulp.dest(pkg.paths.stage + 'content'));
});

/**
* Before deploying, it’s a good idea to clean out the destination folders
 and rebuild the files—just in case any have been removed from the source
 and are left hanging out in the destination folder:
*/
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
    .on('error', errorLog)
});

/* image task
	compress img and utilise caching to save re-compressing
	already compressed images each time this task run
*/	
gulp.task('image', function(){
	var dest = pkg.paths.stage + 'content/images';
	gulp.src('*.jgp')
		//.pipe(plumber())
		.pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))		
		.on('error', errorLog)
		.pipe(gulp.dest(dest))
		.pipe(livereload);	
});

gulp.task('task2', function(){
	gulp.src('js/my*.js')
		//.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
});

/* watch Task
	when js changes it runs task1. e.g., you can minifiy your js automatically evertime it changes
*/
gulp.task('watch', function(){
	var server = livereload();

	gulp.watch('**/my.js', ['script']);
	gulp.watch('css/**/*.css', ['css']);
	gulp.watch('images/*', ['image']);
});

/**
* Notice the additional array in gulp.task. This is where we can define task dependencies.
* In this example, the clean task will run before the tasks in gulp.start.
* Tasks in Gulp run concurrently together and have no order in which they’ll finish,
* so we need to make sure the clean task is completed before running additional tasks.
*/
gulp.task('default', ['clean'], function(){
	gulp.start('script', 'css', 'images', 'watch');
});
	
