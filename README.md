# svgify #

A [browserify](http://browserify.org/) transform for requiring SVG files to
embed directly in your code.

The intention is to be able to quickly inline files saved from Illustrator -
it's still a bit rough around the edges, but should improve over time.

## Installation ##

``` bash
npm install svgify
```

## Usage ##

### `createElement = require('./file.svg')` ###

Returns a function that will create a new SVG `<g>` element containing the
contents of the SVG file supplied.

### `createElement([xOffset[, yOffset]])` ###

Call the function and you'll get an element in return - optionally, you can
pass x/y transform variables to offset the contents of the group.

``` javascript
var circle = require('./circle.svg')
var svg = document.createElement('svg')

// Assuming the circle is 64x64,
// this makes the center of the circle
// the origin.
var el = circle(-32, -32)

svg.appendChild(circle)
document.body.appendChild(svg)
```

