const { src, dest, watch, series } = require('gulp');
// SCSS and CSS
const gulp_sass = require('gulp-sass')( require('sass') );
const post_css = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Images
const image_min = require('gulp-imagemin');
const image_webp = require('gulp-webp');
const image_avif = require('gulp-avif');

const css_compiler = ( done ) => {

    // Identifies the file
    src('src/scss/app.scss')
        .pipe( gulp_sass({ outputStyle: 'compressed' }) ) // Compiles the scss to css
        .pipe( post_css( [ autoprefixer() ] ) )
        .pipe( dest('build/css') ) //Saves the css 
    done();
}

const images = ( done ) => {
    src('src/img/**/*')
        .pipe( image_min({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )

    done();
}

const to_webp = ( done ) => {
    const options = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( image_webp( options ) )
        .pipe( dest('build/img'))
    done();
}

const to_avif = ( done ) => {
    const options = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( image_avif( options ) )
        .pipe( dest('build/img'))
    done();
}

const watch_scss = () => {
    // Recieves two paramaters
    // file to watch and function to execute
    watch( 'src/scss/**/*.scss', css_compiler );
    watch( 'src/img/**/*', images );
}

exports.css = css_compiler;
exports.dev = watch_scss;
exports.images = images;
exports.to_webp = to_webp;
exports.to_avif = to_avif;
exports.default = series( images, to_webp, to_avif, css_compiler, watch_scss );