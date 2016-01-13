var assert = require('assert');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var jquery = require('..');
var cheerio = require('cheerio');

describe('metalsmith-jquery', function() {

    it('should apply changes to basic HTML', function(done) {
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
                    var count = 0;
                    Object.keys(files).forEach(function(file) {
                        $ = cheerio.load(files[file].contents);
                        $('h2').each(function() {
                            assert.equal(true,$(this).hasClass('welcome'));
                            if ($(this).hasClass('welcome')) { count++; }
                        });
                    });
                    assert.equal(count, 3);
                    done();
                }
            });
    });

    it('should apply changes to GFM tables', function(done) {
        var metalsmith = Metalsmith('test/fixtures/table');
        metalsmith
            .use(markdown({
                gfm: true,
                tables: true
            }))
            .use(jquery(function($) {
                $('table').addClass('table table-bordered');
            }))
            .build(function(err, files) {
                if (err) {
                    return(done(err));
                } else {
                    Object.keys(files).forEach(function(file) {
                        $ = cheerio.load(files[file].contents);
                        $('table').each(function() {
                            assert.equal($(this).hasClass('table'), true);
                            assert.equal($(this).hasClass('table-bordered'), true);
                        });
                    });
                    done();
                }
            });
    });

    it('should read the function from a file', function(done) {
        var metalsmith = Metalsmith('test/fixtures/table');
        metalsmith
            .use(markdown())
            .use(jquery('test/fixtures/file/fixit.js'))
            .build(function(err, files) {
                if (err) {
                    return(done(err));
                } else {
                    Object.keys(files).forEach(function(file) {
                        $ = cheerio.load(files[file].contents);
                        $('table').each(function() {
                            assert.equal(true,$(this).hasClass('table'));
                            assert.equal(true,$(this).hasClass('table-bordered'));
                        });
                        $('h2').each(function() {
                            assert.equal($(this).hasClass('welcome'), true);
                        });
                    });
                    done();
                }
            });
    });

    it('should provide access to the metalsmith metadata', function(done){
        var metalsmith = Metalsmith('test/fixtures/basic');
        metalsmith
            .use(markdown())
            .use(jquery(function($, filename, files, metalsmith) {
                // generate a random number, and insert it as h4 and as metalsmith metadata
                var testData = '' + Math.floor(Math.random() * 9999);
                $('h3').after('<h4 id="data">' + testData + '</h4>');
                files[filename]['testData'] = testData;
            }))
            .build(function(err, files) {
                if (err) {
                    return(done(err));
                } else {
                    Object.keys(files).forEach(function(file) {
                        $ = cheerio.load(files[file].contents);
                        assert($('h4#data').text(), files[file]['testData']);
                    });
                    done();
                }
            });
    });

    it('should accept matching criteria for files to process', function(done) {
        var metalsmith = Metalsmith('test/fixtures/glob');
        metalsmith
            .use(markdown())
            .use(jquery('**/*.html', function($) {
                $('h2').addClass('welcome');
            }))
            .build(function(err, files) {
                if (err) {
                    return(done(err));
                } else {
                    var count = 0;
                    Object.keys(files).forEach(function(file) {
                        $ = cheerio.load(files[file].contents);
                        $('h2').each(function() {
                            if ($(this).hasClass('welcome')) { count++; }
                        });
                    });
                    assert.equal(count,3);
                    done();
                }
            });
    });

});
