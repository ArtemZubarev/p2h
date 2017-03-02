var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');
    

gulp.task('less', function () {
  return gulp.src('./app/less/site/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./app/css/site'))
    .pipe(browserSync.reload({stream: true}));
});
gulp.task('concat', function(){
    gulp.src([
        'app/libs/bootstrap-grid-only/css/grid12.css',
        'app/libs/slick-carousel/slick/slick.css',
        'app/libs/selectize/dist/css/selectize.default.css',
    ])
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('app/css'));
});
gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
        'app/libs/slick-carousel/slick/slick.js',
        'app/libs/selectize/dist/js/standalone/selectize.min.js',
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
gulp.task('watch', ['browser-sync', 'less', 'scripts', 'concat'], function() {
    gulp.watch('./app/less/**/*.less', ['less']); // Наблюдение за sass файлами
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
//    gulp.watch('app/css/**/*.css', browserSync.reload);
});
