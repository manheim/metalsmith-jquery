# metalsmith-jquery

[![Build Status](https://travis-ci.org/manheim/metalsmith-jquery.svg?branch=master)](https://travis-ci.org/manheim/metalsmith-jquery)

A [Metalsmith](https://github.com/segmentio/metalsmith) plugin to manipulate HTML via jQuery syntax.

## Features

Leverages [Cheerio](https://github.com/cheeriojs/cheerio) to support a logical subset of jQuery syntax, allowing you to manipulate the HTML generated from [metalsmith-markdown](https://github.com/segmentio/metalsmith-markdown) -- or any other plugin!


## Installation

    $ npm install metalsmith-jquery

## Usage

When your markdown is converted to HTML, it doesn't contain any CSS information.  Use this to add styles to your markdown-generated HTML:

```js
var jquery = require('metalsmith-jquery');

Metalsmith(__dirname)
    .use(markdown())
    .use(jquery(function($) {
        $('h2').addClass('welcome');
    }))
    .use(templates('handlebars'))
    .build(function(err) {
        if (err) throw err;
    });
```

For example, if you're using a Bootstrap template, you may want your Markdown-rendered tables to contain the Bootstrap table CSS classes:

```js
var jquery = require('metalsmith-jquery');

Metalsmith(__dirname)
    .use(markdown())
    .use(jquery(function($) {
        $('table').addClass('table table-bordered');
    }))
    .use(templates('handlebars'))
    .build(function(err) {
        if (err) throw err;
    });
```

If you don't want to process every file, you can include a pattern of files to process:

```js
var jquery = require('metalsmith-jquery');

Metalsmith(__dirname)
    .use(markdown())
    .use(jquery('**/*.html', function($) {
        $('table').addClass('table table-bordered');
    }))
    .use(templates('handlebars'))
    .build(function(err) {
        if (err) throw err;
    });
```

If you want to add specific options to how Cherio should manipulate the generated HTML

```js
var jquery = require('metalsmith-jquery');

Metalsmith(__dirname)
    .use(markdown())
    .use(jquery('**/*.html', function($, {decodeEntities: false}) {
        $('#content').append("<p>моя бабушка старая</p>"); // cyrillic characters wont be HTML-encoded
    }))
    .use(templates('handlebars'))
    .build(function(err) {
        if (err) throw err;
    });
```

Inside your callback, you can access the metalsmith-metadata, and metalsmith filename

```js
    .use(jquery(function($, filename, files, metalsmith) {
        var title = $('h1').first().text();
        if (title)
            files[filename].title = title;
    }))
```

You can also store the javascript in a separate file, which is especially useful if you're managing your Metalsmith configuration in a JSON file:

```json
{
    "plugins": {
        "metalsmith-markdown": {},
        "metalsmith-jquery": "fixit.js"
    }
}
```
... where "fixit.js" is a Javascript file in the node.js module format:

```js
module.exports = function($) {

    $('h2').addClass('welcome');
    $('table').addClass('table table-bordered');

}
```
... and the path is relative to the current working directory.

See the tests for more examples.

Where do we use this?  On our [developer portal](http://developer.manheim.com)!
