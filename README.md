# metalsmith-jquery

[![Build Status](https://travis-ci.org/manheim/metalsmith-jquery.svg?branch=master)](https://travis-ci.org/manheim/metalsmith-jquery)
[![Code Climate](https://codeclimate.com/github/manheim/metalsmith-jquery/badges/gpa.svg)](https://codeclimate.com/github/manheim/metalsmith-jquery)
[![Dependency Status](https://www.versioneye.com/user/projects/5539230b1d2989f7ee000002/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5539230b1d2989f7ee000002)

A [Metalsmith](https://github.com/segmentio/metalsmith) plugin to manipulate HTML via jQuery syntax.

## Features

Leverages [Cheerio](https://github.com/cheeriojs/cheerio) to support a logical subset of jQuery syntax, allowing you to manipulate the HTML generated from [metalsmith-markdown](https://github.com/segmentio/metalsmith-markdown) -- or any other plugin!


## Installation

    $ npm install metalsmith-jquery

## Usage

When your markdown is converted to HTML, it doesn't contain any CSS information.  Use this to add styles to your markdown-generated HTML:

```js
Metalsmith(__dirname)
    .use(markdown())
    .use(jquery(function($) {
        $('h2').addClass('welcome');
    })
    .use(templates('handlebars'))
    .build(function(err) {
        if (err) throw err;
    });
``` 

For example, if you're using a Bootstrap template, you may want your Markdown-rendered tables to contain the Bootstrap table CSS classes:

```js
Metalsmith(__dirname)
    .use(markdown())
    .use(jquery(function($) {
        $('table').addClass('table table-bordered');
    })
    .use(templates('handlebars'))
    .build(function(err) {
        if (err) throw err;
    });
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