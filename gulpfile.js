var gulp=require('gulp');
var connect=require('gulp-connect');
var less=require('gulp-less');
var fileInclude=require('gulp-file-include');
var plumber = require('gulp-plumber');
var rev = require('gulp-rev2');
var del=require('del');
gulp.task("run",['del','less','js','html','server','watch']);
gulp.task('del',function(){
	del("app");
});
gulp.task('server',function(){
	connect.server({
		root:"server",
		host:"192.168.2.161",
		port:8081,
		livereload:true
	});
})
gulp.task('less',function(){
	gulp.src("src/**/*.+(less|css)").pipe(plumber()).pipe(less()).pipe(gulp.dest("server")).pipe(connect.reload());
});
gulp.task('html',function(){
	gulp.src("src/**/*.html").pipe(fileInclude({prefix:'@@',basepath:'@file'})).pipe(gulp.dest("server")).pipe(connect.reload());
});
gulp.task('js',function(){
	gulp.src("src/**/*.js").pipe(plumber()).pipe(gulp.dest("server")).pipe(connect.reload());
});
gulp.task('watch',function(){
	gulp.watch('src/**/*.+(less|css)',['less']);
	gulp.watch('src/**/*.+(html|inc)',['html']);
	gulp.watch('src/**/*.js',['js']);
});
gulp.task('build',function(){
	return gulp.src('server/**/*.{css,js}')
	.pipe(rev())
	.pipe(gulp.dest('app'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('./'));
})
gulp.task('build:html',function(){
	gulp.src("server/**/*.html")
	.pipe(rev.update())
	.pipe(gulp.dest('app'))
})