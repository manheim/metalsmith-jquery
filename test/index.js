var assert = require('assert');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var jquery = require('..');
var cheerio = require('cheerio');

describe('metalsmith-jquery', function() {

    it('should apply changes to HTML', function(done) {
        var metalsmith = Metalsmith('test/fixtures/basic');
        metalsmith
            .use(markdown())
            .use(jquery(function($) {
                $('h2').addClass('welcome');
            }))
            .build(function(err, files) {
                if (err) {
                    return(done(err));
                } else {
                    Object.keys(files).forEach(function(file) {
                    $ = cheerio.load(files[file].contents);
                    $('h2').each(function() {
                        assert.equal(true,$(this).hasClass('welcome'));
                    });
                });
                done();
            }
        });
    });
});