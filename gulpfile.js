/* gulpfile.js */
var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    gzip = require('gulp-gzip'),
    uglify = require('gulp-uglify');
    concat = require('gulp-concat'),
    liveReload = require('gulp-livereload');

// source and distribution folder
var
    source = 'src/',
    dest = 'dist/';

// Bootstrap scss source
var bootstrapSass = { in : './node_modules/bootstrap-sass/'
};

// Bootstrap native source
var bootstrapNative = { in : './node_modules/bootstrap.native/'
};

// Fecth REST polyfill
var fetch = { in : './node_modules/whatwg-fetch/'
};

// Riot framework
var riot = { in : './node_modules/riot/'
};

// css source file: .scss files
var css = { in : source + 'scss/main.scss',
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precision: 8,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

var bootstrapJs = { in : bootstrapNative.in + 'dist/bootstrap-native.js',
    distName: 'bootstrap-native',
    out: dest + 'js/'
};

var riotJs = { in : riot.in + '/riot+compiler.min.js',
    out: dest + 'js/'
}

var fetchJs = { in : fetch.in + 'fetch.js',
    out: dest + 'js/'
};

var fonts = { in : source + 'font/*.*',
    out: dest + 'font/'
}

var html = { in : source + '*.html',
    out: dest,
    watch: source + '*.html'
};

var icon = { 
    in : source + '*.ico',
    out: dest
};

var tags = { in : source + 'tags/*.tag',
    out: dest + 'tags/',
    watch: source + 'tags/*.tag',
};

gulp.task('bootstrapJs', function() {
    var srcDir = bootstrapNative.in + 'lib/';
    // array of source files to build
    var sources = [
        //      srcDir + 'affix-native.js',
        //      srcDir + 'alert-native.js',
        //      srcDir + 'button-native.js',
        //      srcDir + 'carousel-native.js',
        //      srcDir + 'collapse-native.js',
        srcDir + 'dropdown-native.js' //,
        //      srcDir + 'modal-native.js',
        //      srcDir + 'popover-native.js',
        //      srcDir + 'scrollspy-native.js',
        //      srcDir + 'tab-native.js',
        //      srcDir + 'tooltip-native.js'
    ];
    return gulp
        .src(sources)
        .pipe(concat(bootstrapJs.distName + ".js"))
	.pipe(uglify())
        .pipe(gulp.dest(bootstrapJs.out))
	.pipe(gzip())
        .pipe(gulp.dest(bootstrapJs.out));
});

gulp.task('appTags', function() {
    return gulp
        .src(tags.in)
        .pipe(gulp.dest(tags.out))
        .pipe(liveReload());
});

gulp.task('html', function() {
    return gulp
        .src(html.in)
        .pipe(gulp.dest(html.out))
        .pipe(liveReload());
});

gulp.task('icon', function() {
    return gulp
        .src(icon.in)
        .pipe(gulp.dest(icon.out));
});

gulp.task('fetch', function() {
    return gulp
        .src(fetchJs.in)
	.pipe(uglify())
        .pipe(gulp.dest(fetchJs.out))
	.pipe(gzip())
        .pipe(gulp.dest(fetchJs.out));
});

gulp.task('riot', function() {
    return gulp
        .src(riotJs.in)
        .pipe(gulp.dest(riotJs.out))
	.pipe(gzip())
        .pipe(gulp.dest(riotJs.out));
});

// compile scss
gulp.task('sass', /*['fonts'],*/ function() {
    return gulp.src(css.in)
        .pipe(sass(css.sassOpts))
        .pipe(gulp.dest(css.out))
	.pipe(gzip())
        .pipe(gulp.dest(css.out))
        .pipe(liveReload());
});

gulp.task('font', function() {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

// default task
gulp.task('default', ['sass', 'font', 'html', 'icon', 'bootstrapJs', 'fetch', 'riot', 'appTags'], function() {
    liveReload.listen();
    gulp.watch(css.watch, ['sass']);
    gulp.watch(html.watch, ['html']);
    gulp.watch(tags.watch, ['appTags']);
});
