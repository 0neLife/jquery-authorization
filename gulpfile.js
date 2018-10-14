var gulp 						= require('gulp'),
		sass 						= require('gulp-sass'),
		rename 					= require('gulp-rename'),
		uglify 					= require('gulp-uglify'),
		minifycss 			= require('gulp-minify-css'),
		autoprefixer 		= require('gulp-autoprefixer'),
		imagemin  			= require('gulp-imagemin'),
		imageminMozjpeg = require('imagemin-mozjpeg'),
		browserSync 		= require('browser-sync').create();

gulp.task('browser-sync', [
						'styles',
						'imageCompression',
						'copyfontAwesome',
						'copyfonts',
						'copyLibs',
						'copyHtml',
						'scripts'
							], function() {
	browserSync.init({
			server: {
					baseDir: './dist'
			},
			notify: false,
			files: ['./dist/**/*.html','./dist/js/*.js','./dist/css/*.css','./dist/libs/*']
	});
});

gulp.task('styles', function () {
	gulp.src('app/sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({
		browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
		cascade: false
	}))
	.pipe(minifycss(''))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('imageCompression', () =>
  gulp.src('app/img/*')
  .pipe(imagemin([imageminMozjpeg({
      quality: 85
  })]))
  .pipe(gulp.dest('dist/img/'))
);

gulp.task('copyfontAwesome', function() {
  return gulp.src([
  	'app/libs/font-awesome/webfonts/*.{ttf,woff,woff2,eot,svg}',
  	'app/libs/font-awesome/css/all.min.css'
  	])
  	.pipe(gulp.dest('dist/css/font-awesome/webfonts/'));
});

gulp.task('copyfonts', function() {
  return gulp.src([
  	'app/fonts/**/*.{ttf,woff,eot}'])
  	.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('copyLibs', function() {
	return gulp.src([
		'app/libs/bootstrap-grid/*.css',
		'app/libs/jquery/*.js'
		])
		.pipe(gulp.dest('dist/libs'));
});

gulp.task('scripts', function() {
  return gulp.src('app/js/**/*.js')
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/js'))
});

gulp.task('copyHtml', function() {
	return gulp.src('app/**/*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
	gulp.watch('app/sass/*.sass', ['styles']);
	gulp.watch('app/libs/*', ['copyLibs']);
	gulp.watch('app/js/*.js', ['scripts']);
	gulp.watch('app/*.html', ['copyHtml']);
});

gulp.task('default', ['watch','browser-sync']);