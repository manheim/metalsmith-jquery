var assert = require('assert');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var cheerio = require('..');

describe('metalsmith-cheerio', function() {

	it('should apply changes to HTML', function(done) {
	  var metalsmith = Metalsmith('test/fixtures/basic');
	  metalsmith
	  .use(markdown())
      .use(cheerio(function($) {
          $('h2').addClass('welcome');
      }))
      .build(function(err) {
          if (err) {
            return(done(err));
          } else {
            return(done());
          }
      });
	});
});