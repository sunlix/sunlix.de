/**
 * Used modules
 */

var gulp       = require('gulp'),
    plugins    = require('gulp-load-plugins')();
    del        = require('del'),
    vinylPaths = require('vinyl-paths'),
    merge      = require('merge-stream'),
    exec       = require('child_process').execSync;

/**
 * Path variables
 */

var base                  = '.',
    sass                  = base + '/src',
    assets                = base + '/assets',
    assets_js             = assets + '/js',
    assets_js_libs        = assets_js + '/libs',
    assets_css            = assets + '/css',
    assets_img            = assets + '/img',
    assets_fonts          = assets + '/fonts',
    stage_preview_path    = base + '/../prev',
    stage_production_path = base + '/../prod',
    fileset = {
        base: [
            '!' + sass + '/**',
            '!' + base + '/node_modules/**',
            '!' + base + '/bower_components/**',
            '!gulpfile.js',
            '**/*.html',
            '**/*.css',
            '**/*.js',
        ],
        img: [
            '**/*.gif',
            '**/*.jpg',
            '**/*.png',
        ],
        fonts: [
            '**/*.eot',
            '**/*.otf',
            '**/*.svg',
            '**/*.ttf',
            '**/*.woff',
            '**/*.woff2',
        ],
        toArray: function() {
            return fileset.base.concat(fileset.img.concat(fileset.fonts))
        }
    };

gulp.task('default', function() {
    console.log('Execute "gulp deploy:preview|deploy:production" to deploy the specified version');
    console.log('Execute "gulp compile:preview|compile:production" to only compile the source files');
});

/**
 * Assets tasks
 */

gulp.task('assets:find', ['clean'], function() {
    var j = gulp
                .src([
                    '**/*.js',
                    '!**/jquery.*.js'
                ], {cwd: sass})
                .pipe(plugins.flatten())
                .pipe(gulp.dest(assets_js))

    var l = gulp
                .src('**/jquery.*.js', {cwd: sass})
                .pipe(plugins.flatten())
                .pipe(gulp.dest(assets_js_libs));

    var i = gulp
                .src(fileset.img, {cwd: sass})
                .pipe(plugins.flatten())
                .pipe(gulp.dest(assets_img));

    var f = gulp
                .src(fileset.fonts, {cwd: sass})
                .pipe(plugins.flatten())
                .pipe(gulp.dest(assets_fonts));

    return merge(j, l, i, f);
});

gulp.task('assets:concat', ['assets:find'], function() {
    return gulp
            .src('*', {cwd: assets_js_libs})
            .pipe(plugins.concat('jquery.libs.js'))
            .pipe(gulp.dest(assets_js));
});

/**
 * Compile tasks
 */

gulp.task('compile:preview', ['assets:concat'], function() {
    return exec('compass compile -e development --force');
});

gulp.task('compile:production', ['assets:concat'], function() {
    exec('compass compile -e production --force')

    return gulp
            .src([
                '**/*.js',
                '!/**/*.min.js'
            ], {cwd: assets_js})
            .pipe(plugins.uglify())
            .pipe(plugins.rename({
                extname: '.min.js'
            }))
            .pipe(gulp.dest(assets_js));
});

/**
 * Deploy tasks
 */

gulp.task('deploy:preview:process', ['compile:preview'], function() {
    return gulp
            .src(fileset.toArray())
            .pipe(gulp.dest(stage_preview_path));
});

gulp.task('deploy:preview', ['deploy:preview:process'], function() {
    return gulp.start('clean:cache');
});

gulp.task('deploy:production:process', ['compile:production'], function() {
    return gulp
            .src(fileset.toArray())
            .pipe(gulp.dest(stage_production_path));
});

gulp.task('deploy:production', ['deploy:production:process'], function() {
    return gulp.start('clean:cache');
});

/**
 * Clean tasks
 */

gulp.task('clean:cache', function() {
    return gulp
            .src([
                assets,
                base + '/.sass-cache'
            ])
            .pipe(vinylPaths(del));
});

gulp.task('clean', ['clean:cache'], function() {
    return gulp
            .src([
                stage_preview_path,
                stage_production_path
            ])
            .pipe(vinylPaths(function(paths) {
                return del(paths, {'force': true})
            }));
});
