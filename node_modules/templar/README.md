# templar

A minimal template thing for node.js web sites to use.

Works with any template engine that works with Express.

Automatically sends ETags based on the data and the template being used,
and 304 responses based on the `If-None-Match` request header, if the
user would be getting the same exact response as last time.

## Example

```javascript
var ejs = require('ejs')
, Templar = require('templar')
, templarOptions = { engine: ejs, folder: './templates' }

// preload it.  Otherwise, the first request is slow, because
// it has to load up all the templates within it.
Templar.loadFolder('./templates')

http.createServer(function (req, res) {
  // note that this causes a sync fs hit the first time if
  // the folder has not been loaded yet.
  res.template = Templar(req, res, templarOptions)

  // .. later, after figuring out which template to use ..
  res.template('foo.ejs', { some: 'data', for: [ 'the', 'template'] })
}).listen(PORT)
```

## Options

* `engine`: The engine to use.  EJS and Jade both work.
* `folder`: The folder where template files are found.

## Partials

Every template will be provided with a local function
`include(file, data)`.  This function will include another template via
a relative path, run it using the data provided, and return the string.

Note that this does not automatically dump the data into the calling
template!  It's still the caller's responsibility to actually print out
the result.

### Example

If the template `full.ejs` contains this:

```ejs
<!doctype html ALL UP IN YOUR FACE>
<html>
<head><title>yoyoyoyo</title>
<body>
<%- include("partial.ejs", { partial: 1 }) %>
<%- include("partial.ejs", { partial: 2 }) %>
<%- include("partial.ejs", { partial: 3 }) %>
<%- include("partial.ejs", { partial: 4 }) %>
<%- include("partial.ejs", { partial: 5 }) %>
</body></html>
```

Then, in the same folder, you had a `partial.ejs` that contained:

```ejs
<p>is for <%= partial %>
```

then the resulting output would be:

```html
<!doctype html ALL UP IN YOUR FACE>
<html>
<head><title>yoyoyoyo</title>
<body>
<p>is for 1

<p>is for 2

<p>is for 3

<p>is for 4

<p>is for 5

</body></html>
```

Note that `full.ejs` actually prints out the result of the include call.
