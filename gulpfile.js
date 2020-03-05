const {watch ,src, dest, series, parallel} = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const Sass = require('gulp-sass');
const px2rpx = require('gulp-px2rpx');
const rename = require("gulp-rename");
const babel = require('gulp-babel');

const path = {
    ts: "src/**/*.ts",
    js: "src/**/*.js",
    wxml: "src/**/*.wxml",
    sass: "src/**/*.sass",
    wxss: "src/**/*.wxss",
    wxs: "src/**/*.wxs",
    json: "src/**/*.json",
    png: "scr/**/*.png",
    jpg: "scr/**/*.jpg",
    jpeg: "scr/**/*.jpeg",
}

function tsc(params) {
    return src(path.ts)
            .pipe(tsProject())
            .pipe(dest("dist"));
}

function jsc(params) {
    return src(path.js)
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(dest('dist'));
}

function sass(params) {
    return src(path.sass)
            .pipe(Sass().on('error', Sass.logError))
            .pipe(px2rpx({
                screenWidth: 750, // 设计稿屏幕, 默认750
                wxappScreenWidth: 750, // 微信小程序屏幕, 默认750
                remPrecision: 6 // 小数精度, 默认6
            }))
            .pipe(rename({
                extname:'.wxss'
            }))
            .pipe(dest('dist'));
}


function copy(options) {
    return src(['src/**/*',`!${path.ts}`,`!${path.sass}`,`!${path.js}`])
                .pipe(dest("dist"));
};

function dev(cd) {
    watch(path.js, series(jsc));
    watch(path.ts, series(tsc));
    watch(path.sass, series(sass));
    watch([path.json, path.wxml, path.wxs, path.wxss], series(copy));
    cd();
}


exports.dev = series(
    jsc,
    tsc,
    sass,
    copy,
    dev
);

exports.default = series(
    jsc,
    tsc,
    sass,
    copy
);
