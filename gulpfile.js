var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var sass = require('gulp-ruby-sass');

gulp.task("tsc", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("js"));
});
 
gulp.task('sass', function() {
    return sass('scss/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('css/'));
});

gulp.task("default",["tsc","sass"]);