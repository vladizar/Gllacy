const {src, dest, parallel, series, watch} = require('gulp');

const src_folder  = '#src';
const dist_folder = 'dist';

const path =
{
    src:
    {
        html:  [src_folder + '/*.html', '!' + src_folder + '/_*.html'],
        scss:  src_folder + '/scss/style.scss',
        js:    src_folder + '/js/script.js',
        img:   src_folder + '/img/**/*.{jpg,jpeg,png,svg}',
        fonts: src_folder + '/fonts/*.{woff,woff2,ttf,otf}'
    },

    dist:
    {
        html:   dist_folder + '/',
        css:    dist_folder + '/css/',
        js:     dist_folder + '/js/',
        img:    dist_folder + '/img/',
        fonts:  dist_folder + '/fonts/',
        folder: './' + dist_folder + '/'
    },

    watch:
    {
        html: src_folder + '/*.html',
        scss: src_folder + '/scss/*.scss',
        js:   src_folder + '/js/*.js',
        img:  src_folder + '/img/**/*.{jpg,jpeg,png,svg}'
    }
}

const browserSync       = require('browser-sync').create();
const fileInclude       = require('gulp-file-include');
const sass              = require('gulp-sass');
const autoprefixer      = require('gulp-autoprefixer');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleancss          = require('gulp-clean-css');
const rename            = require('gulp-rename');
const uglify            = require('gulp-uglify-es').default;
const imagemin          = require('gulp-imagemin');
const newer             = require('gulp-newer');
const ttf2woff          = require('gulp-ttf2woff');
const ttf2woff2         = require('gulp-ttf2woff2');
const fonter            = require('gulp-fonter');
const del               = require('del');

function browsersync()
{
    browserSync.init(
    {
        server:
        {
            baseDir: path.dist.folder
        },

        notify: false
    });
}

function html()
{
    return src(path.src.html)
           .pipe(fileInclude())
           .pipe(dest(path.dist.html))
           .pipe(browserSync.stream());
}

function scss()
{
    return src(path.src.scss)
           .pipe(sass())
           .pipe(groupMediaQueries())
           .pipe(autoprefixer(
            {
                overrideBrowserslist: ['last 5 versions']
            }))
           .pipe(dest(path.dist.css))
           .pipe(cleancss())
           .pipe(rename(
            {
                extname: '.min.css'
            }))
           .pipe(dest(path.dist.css))
           .pipe(browserSync.stream());
}

function js()
{
    return src(path.src.js)
           .pipe(fileInclude())
           .pipe(dest(path.dist.js))
           .pipe(rename(
           {
               extname: '.min.js'
           }))
           .pipe(uglify(
            {
                toplevel: true,
            }))
           .pipe(dest(path.dist.js))
           .pipe(browserSync.stream());
}

function img()
{
    return src(path.src.img)
           .pipe(newer(path.dist.img))
           .pipe(imagemin(
            {
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            }))
           .pipe(dest(path.dist.img))
           .pipe(browserSync.stream());
}

function fonts()
{
    src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.dist.fonts));

    return src(path.src.fonts)
           .pipe(ttf2woff2())
           .pipe(dest(path.dist.fonts));
}

function otf2ttf()
{
    src([src_folder + '/fonts/*.otf'])
    .pipe(fonter(
    {
        formats: ['ttf']
    }))
    .pipe(dest(path.src.fonts));

    return del([src_folder + '/fonts/*.otf']);
}

function watchFiles()
{
    watch([path.watch.html], html);
    watch([path.watch.scss], scss);
    watch([path.watch.js], js);
    watch([path.watch.img], img);
}

const build   = parallel(img, fonts, js, scss, html);
const watcher = series(build, parallel(watchFiles, browsersync));

exports.otf2ttf = otf2ttf;
exports.fonts   = fonts;
exports.img     = img;
exports.js      = js;
exports.scss    = scss;
exports.html    = html;
exports.build   = build;
exports.watch   = watcher;
exports.default = watcher;