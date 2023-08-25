const { src, dest } = require('gulp');
const gulp_sass = require('gulp-sass')( require('sass') );

const css = ( done ) => {

    // Identifies the file
    src('src/scss/app.scss')
        .pipe( gulp_sass() ) // Compiles the scss to css
        .pipe( dest('build/css') ) //Saves the css 
    done();
}

exports.css = css;