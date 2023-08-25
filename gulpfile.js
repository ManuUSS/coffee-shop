const { src, dest, watch } = require('gulp');
const gulp_sass = require('gulp-sass')( require('sass') );
const post_css = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const css = ( done ) => {

    // Identifies the file
    src('src/scss/app.scss')
        .pipe( gulp_sass({ outputStyle: 'compressed' }) ) // Compiles the scss to css
        .pipe( post_css( [ autoprefixer() ] ) )
        .pipe( dest('build/css') ) //Saves the css 
    done();
}

const dev = ( done ) => {
    // Recieves two paramaters
    // file to watch and function to execute
    watch( 'src/scss/app.scss', css );
    done();
}

exports.css = css;
exports.dev = dev;