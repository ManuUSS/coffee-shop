const { src, dest, watch, series } = require('gulp');
const gulp_sass = require('gulp-sass')( require('sass') );
const post_css = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const css_compiler = ( done ) => {

    // Identifies the file
    src('src/scss/app.scss')
        .pipe( gulp_sass({ outputStyle: 'compressed' }) ) // Compiles the scss to css
        .pipe( post_css( [ autoprefixer() ] ) )
        .pipe( dest('build/css') ) //Saves the css 
    done();
}

const watch_scss = () => {
    // Recieves two paramaters
    // file to watch and function to execute
    watch( 'src/scss/**/*.scss', css );
}

exports.css = css_compiler;
exports.dev = watch_scss;
exports.default = series( css_compiler, watch_scss );