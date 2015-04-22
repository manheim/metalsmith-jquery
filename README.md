# metalsmith-jquery

A [Metalsmith](https://github.com/segmentio/metalsmith) plugin to manipulate HTML via jQuery syntax.

## Features

Leverages [Cheerio](https://github.com/cheeriojs/cheerio) to support a logical subset of jQuery syntax, allowing you to manipulate the HTML generated from [metalsmith-markdown](https://github.com/segmentio/metalsmith-markdown) -- or any other plugin!


## Installation

    $ npm install metalsmith-jquery

## Usage

When your markdown is converted to HTML, it doesn't contain any CSS information.  Use this to add styles to your markdown-generated HTML:

```js
{
    "plugins": {
        "metalsmith-markdown": {},
        "metalsmith-jquery": function($) {
            $('h2').addClass('welcome');
        }
    }
}

``` 

For example, if you're using a Bootstrap template, you may want your Markdown-rendered tables to contain the Bootstrap table CSS classes:

```js
{
    "plugins": {
        "metalsmith-markdown": {},
        "metalsmith-jquery": function($) {
            $('table').addClass('table table-bordered');
        }
    }
}

``` 

See the tests for more examples.

Where do we use this?  On our [developer portal](http://developer.manheim.com)!