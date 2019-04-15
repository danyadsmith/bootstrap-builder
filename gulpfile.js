const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');

const paths = {
  project: {
    src: './src',
    root: './dist'
  },
  sass: {
    custom: {
      src: 'src/scss/*.scss'
    },
    dest: 'dist/css'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist/'
  },
  js: {
    bootstrap: {
      src: 'node_modules/bootstrap/dist/js/bootstrap.min.js'
    },
    jquery: {
      src: 'node_modules/jquery/dist/jquery.min.js'
    },
    popper: {
      src: 'node_modules/popper.js/dist/umd/popper.min.js'
    },
    custom: {
      src: 'src/js/*'
    },
    dest: 'dist/js'
  },
  img: {
    src: 'src/img/**/*',
    dest: 'dist/img'
  },
  fontawesome: {
    webfonts: {
      src: 'node_modules/@fortawesome/fontawesome-free/webfonts/*',
      dest: 'dist/webfonts'
    },
    styles: {
      src: 'node_modules/@fortawesome/fontawesome-free/css/all.css',
      dest: 'dist/css'
    }
  },
  favicon: {
    src: 'src/favicon.ico',
    dest: 'dist/'
  }
};

function reload(done) {
  browserSync.reload();
  done();
}

function html() {
  return gulp.src([
    paths.html.src
  ])
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

function styles() {
  return gulp.src([
    paths.sass.custom.src
  ])
    .pipe(sass())
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(browserSync.stream());
}

function js() {
  return gulp.src([
    paths.js.bootstrap.src,
    paths.js.jquery.src,
    paths.js.popper.src,
    paths.js.custom.src
  ], { sourcemaps: true })
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

function images() {
  return gulp.src([
    paths.img.src
  ])
    .pipe(gulp.dest(paths.img.dest))
    .pipe(browserSync.stream());
}

function favicon() {
  return gulp.src([
    paths.favicon.src
  ])
    .pipe(gulp.dest(paths.favicon.dest));
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: paths.project.root
    }
  });
  done();
}

function webfonts() {
  return gulp.src(paths.fontawesome.webfonts.src)
    .pipe(gulp.dest(paths.fontawesome.webfonts.dest));
}

function fontawesome() {
  return gulp.src(paths.fontawesome.styles.src)
    .pipe(rename({
      basename: 'font-awesome',
      ext: '.css'
    }))
    .pipe(gulp.dest(paths.sass.dest));
}

function watch() {
  gulp.watch(paths.sass.custom.src, gulp.series(styles));
  gulp.watch(paths.js.custom.src, gulp.series(js));
  gulp.watch(paths.html.src, gulp.series(html));
  gulp.watch(paths.img.src, gulp.series(images));
}

gulp.task('default', gulp.series(serve, html, styles, js, webfonts, fontawesome, images, watch, reload, function () {
  done();
}));

