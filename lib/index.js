"use strict";

var cheerio = require('cheerio');
var debug = require('debug')('metalsmith-jquery');
var path = require('path');
var minimatch = require('minimatch');

module.exports = function(param1, param2) {

    var transform = function() {};
    var globFilter = function() { return true; };

    if (param2) {
      globFilter = minimatch.filter(param1);

      // shift parameters
      param1 = param2;
    }

    if (typeof param1 === "string") {
        var filename = path.resolve(process.cwd(), param1);
        debug("Loading file: " + filename);
        transform = require(filename);
    } else if (typeof param1 !== "function") {
        debug("No transform function found");
    } else {
        transform = param1;
    }

    return(function(files, metalsmith, done) {

        Object.keys(files).filter(globFilter).forEach(function(file) {
            var page = cheerio.load(files[file].contents);
            transform(page, file, files, metalsmith);
            files[file].contents = new Buffer(page.html());
        });

        done();

    });

}
