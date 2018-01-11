var gulp=require('gulp');
var connect=require('gulp-connect');
var less=require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var fileInclude=require('gulp-file-include');
var plumber = require('gulp-plumber');
var rev = require('gulp-rev3');
var del=require('del');
var cached = require('gulp-cached');
var cssmin = require('gulp-clean-css');
var uglify= require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var styleLess=require('style-less2');
var useref = require('gulp-useref');
var runSequence = require('run-sequence');
gulp.task('del',function(){
	del("server/**/*");
});
gulp.task('server',function(){
	connect.server({
		root:"server",
		// host:"192.168.2.161",
		port:8081,
		livereload:true
	});
})
gulp.task('less',function(){
	gulp.src("src/**/*.{less,css}").pipe(plumber()).pipe(less())
	.pipe(cached())
	.pipe(gulp.dest("server")).pipe(connect.reload());
});
gulp.task('html',function(){
	gulp.src("src/**/*.html")
	.pipe(styleLess())
	.pipe(fileInclude({prefix:'@@',basepath:'@file'}))
	.pipe(cached('html'))
	.pipe(gulp.dest("server")).pipe(connect.reload());
});
gulp.task('js',function(){
	gulp.src("src/**/*.js").pipe(cached('js')).pipe(plumber()).pipe(gulp.dest("server")).pipe(connect.reload());
});
gulp.task('watch',function(){
	gulp.watch('src/**/*.+(less|css)',['less']);
	gulp.watch('src/**/*.+(html|inc)',['html']);
	gulp.watch('src/**/*.js',['js']);
});
gulp.task("run",['del','less','js','html','server','watch']);


gulp.task("build:css",function(){
	return gulp.src("src/**/*.{less,css}")
	.pipe(less())
	.pipe(autoprefixer({browsers:['last 2 versions','safari 5','ie 8',  'ie 9','opera 12.1', 'ios 6', 'android 4'  ]}))
	.pipe(cssmin())
	.pipe(gulp.dest('server'))
})
gulp.task("build:js",function(){
	return gulp.src("src/**/*.js")
	.pipe(uglify({mangle: true}))
	.pipe(gulp.dest('server'))
})
gulp.task("build:html",function(){
	return gulp.src("src/**/*.html")
	.pipe(styleLess())
	.pipe(fileInclude({prefix:'@@',basepath:'@file'}))
	.pipe(gulp.dest('server'))
})
gulp.task('concat', function () {
    return gulp.src('server/**/*.html')
    .pipe(useref())
    .pipe(gulp.dest('server/'));
});
gulp.task('md5:jc',function(){
	return gulp.src('server/**/*.{css,js}')
	.pipe(rev())
	.pipe(gulp.dest('app'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('./'));
})
gulp.task('md5:html',function(){
	return gulp.src("server/**/*.html")
	.pipe(rev.update())
	.pipe(htmlmin({collapseWhitespace: true, minifyCSS: true}))
	.pipe(gulp.dest('app'))
})
gulp.task('build',function(){
	runSequence('del',['build:css','build:js','build:html'],'concat','md5:jc','md5:html');
});
gulp.task('default',function(){
	gulp.src('src/index.html')
	.pipe(styleLess())
	.pipe(gulp.dest('dist'))
})