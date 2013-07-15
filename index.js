var path = require('path')
var trumpet = require('trumpet')
var through = require('through')

module.exports = function(file) {
  if (path.extname(file) !== '.svg') return through()

  var out = through(write, end)
  var tr = trumpet()
  var svg = tr.select('svg')
    .createReadStream()
    .once('data', function() {
      out.queue('function format(text) {')
      out.queue(  'return function(x, y) {')
      out.queue(    'x = (+x|0);')
      out.queue(    'y = (+y|0);')
      out.queue(    'var el = document.createElement(\"div\");')
      out.queue(    'el.innerHTML = "<svg><g><g>" + text + "</g></g></svg>";')
      out.queue(    'el = el.childNodes[0].childNodes[0];')
      out.queue(    'el.childNodes[0].setAttribute("transform", "translate(" + x + "," + y + ")");')
      out.queue(    'return el')
      out.queue(  '}')
      out.queue('}\n')
      out.queue('module.exports = format("')
    })

  svg.once('end', function() {
    out.queue('")')
    out.queue(null)
  }).on('data', function(data) {
    data = String(data)
      .replace(/\n\r|\r\n|\n/g, '\\n')
      .replace(/\"/g, '\\"')
    out.queue(data)
  })

  function write(data) {
    return tr.write(data)
  }

  function end() {
    tr.end()
  }

  return out
}
