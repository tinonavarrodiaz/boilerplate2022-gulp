import gulp from 'gulp';
const sass = require('gulp-sass')(require('sass'));
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import browserify from 'browserify';
import babelify from 'babelify';
import sourcemaps from 'gulp-sourcemaps';
import tildeImporter from 'node-sass-tilde-importer';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import minify from 'gulp-minify';
import data from 'gulp-data';
import tinypng from 'gulp-tinypng-compress';
import deploy from 'gulp-gh-pages';
import fs from 'fs';
const webp = require('gulp-webp');
import { Server } from 'http';
const path = require('path');

const server = browserSync.create();

const devPath = path.join(__dirname, 'src');
const dest = path.join(__dirname, 'public');

const tinypngApiKey = 'X8tf1jg75VsrrdWsDJfcbGxWxkw4gj8Y';

const postcssPlugins = [
  cssnano({
    core: false,
    zindex: false,
    autoprefixer: {
      add: true,
      browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1',
    },
  }),
];

const pugTask = () => {
  return gulp
    .src(`${devPath}/pug/pages/**/*.pug`)
    .pipe(plumber())
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync('./src/data/data.json'));
      })
    )
    .pipe(
      pug({
        pretty: true,
        basedir: './src/pug',
      })
    )
    .pipe(gulp.dest(dest));
};

const styles = () => {
  return gulp
    .src(`${devPath}/scss/styles.scss`)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(plumber())
    .pipe(
      sass({
        importer: tildeImporter,
        // outputStyle: 'expanded',
        includePaths: ['./node_modules'],
      })
    )
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest(`${dest}/css`))
    .pipe(server.stream({ match: '**/*.css' }));
};

const scripts = () => {
  return browserify(`${devPath}/js/index.js`)
    .transform(babelify, {
      global: true, // permite importar desde afuera (como node_modules)
    })
    .bundle()
    .on('error', function (err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(
      minify({
        ext: {
          src: '-min.js',
          min: '.js',
        },
      })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${dest}/js`));
};

const imgDev = (done) => {
  return gulp
    .src(`${devPath}/img/**.**`)
    .pipe(webp())
    .pipe(gulp.dest(`${dest}/img`));
};

const imgBuild = () => {
  return gulp
    .src(`${devPath}/img/**/*.{png,jpg}`)
    .pipe(tinypng(tinypngApiKey))
    .pipe(webp())
    .pipe(gulp.dest(`${dest}/img`));
};

const deployGH = () => {
  return gulp.src(`${dest}/**/*`).pipe(deploy());
};

gulp.task(
  'default',
  gulp.series(pugTask, styles, scripts, imgDev, (done) => {
    server.init({
      server: {
        baseDir: dest,
      },
    });
    gulp
      .watch(`./src/pug/**/**`)
      .on('change', gulp.series(pugTask, server.reload));
    gulp.watch('./src/scss/**/**').on('change', gulp.series(styles));
    gulp
      .watch('./src/js/**/**')
      .on('change', gulp.series(scripts, server.reload));
    gulp
      .watch('./src/img/**/**')
      .on('change', gulp.series(imgDev, server.reload));
  })
);

gulp.task('build', gulp.series(pugTask, styles, scripts, imgBuild, deployGH));

exports.styles = styles;
exports.pug = pug;
exports.scripts = scripts;
exports.imgDev = imgDev;
exports.imgBuild = imgBuild;
exports.deployGH = deployGH;
// exports.assets = assets;
