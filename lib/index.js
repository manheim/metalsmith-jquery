"use strict";

var cheerio = require('cheerio');
var debug = require('debug')('metalsmith-jquery');
var path = require('path');
var minimatch = require('minimatch');

module.exports = function(param1, param2, param3) {

    var transform = function() {};
    var globFilter = function() { return true; };
	var options = false;

	if (param2 &&  typeof param2 === "object") {
	   // when used in the following manner module(some transform function or transform script filename, some cheerio options) 
		options = param2
	}

	if (param3 && typeof param3 === "object") {
	    // when used in the following manner module('filter',some transform function or transform script filename, some cheerio options) 
		options = param3
	}

    if (param2 && typeof param2 !== "object") {
	  // when used in the following manner module('filter',some transform function or transform script filename) 
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
			var page;
			if(options) {
	            page = cheerio.load(files[file].contents, options);
			} else {
 	           page = cheerio.load(files[file].contents);
			}
            transform(page, file, files, metalsmith);
            files[file].contents = new Buffer.from(page.html());
        });

        done();

    });

}
