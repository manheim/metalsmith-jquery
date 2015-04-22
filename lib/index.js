"use strict";

var cheerio = require('cheerio');
var debug = require('debug')('metalsmith-jquery');
var path = require('path');

module.exports = function(param) {

    var transform = function() {};

    if (typeof param === "string") {
        var filename = path.resolve(process.cwd(), param);
        debug("Loading file: " + filename);
        transform = require(filename);
    } else if (typeof param !== "function") {
        debug("No transform function found");
    } else {
        transform = param;
    }

    return(function(files, metalsmith, done) {

        Object.keys(files).forEach(function(file) {
            var page = cheerio.load(files[file].contents);
            transform(page);
            files[file].contents = new Buffer(page.html());
        });

        done();

    });

}