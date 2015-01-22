#!/usr/local/bin/node

var fs        = require('fs'),
    UglifyJS  = require('uglify-js'),
    CleanCSS  = require('clean-css'),
    copyright = '/* Copyright (c) 2015 Ryan Morrissey <https://rymo.io/> */';

function buildJSFile(files, name) {
    var minifiedJS = UglifyJS.minify(files, {output: {"ascii_only": true}}).code;
    fs.writeFile(__dirname + '/min/' + name, copyright + '\n' + minifiedJS);
}

function buildCSSFile(files, name) {
    var minifiedCSS = new CleanCSS().minify(files).styles;
    fs.writeFile(__dirname + '/min/' + name, copyright + '\n' + minifiedCSS);
}


console.log('Building and minifying...');

buildJSFile('katan.js', 'katan.min.js');
console.log('\tkatan.min.js - Done');

buildJSFile(['raphael.js', 'katan.js'], 'katan+raphael.min.js');
console.log('\tkatan+raphael.min.js - Done');

buildCSSFile(['katan.css'], 'katan.min.css');
console.log('\tkatan.min.css - Done');

console.log('...build complete!');
