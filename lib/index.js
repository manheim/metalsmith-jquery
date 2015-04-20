"use strict";

var cheerio = require('cheerio');
var debug = require('debug')('metalsmith-cheerio');

module.exports = function(transform) {

	if (typeof transform !== "function") {
	  debug("No transform function found, substituting empty function");
	  opts = function() {};
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