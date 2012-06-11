# error-page

Easily send errors in Node.js HTTP servers.

Think like the `ErrorDocument` declarations in Apache config files.

## Usage

```javascript
var ErrorPage = require('error-page')

http.createServer(function (req, res) {
  // returns a function that we use to send error responses
  res.error = ErrorPage(req, res, { // options
    404: the404HandlerFunction,
    5xx: handleAll500s,
    403: 'forbidden.ejs', // template name integrates with Templar
    400: 'that was bad', // other strings just print out as-is
    "*": handleEverythingElse
    debug: false // show full stack traces, or just messages
  })

  // .. some time later ..
  // .. we've decided that the page doesn't exist ..
  return res.error(404)

  // or maybe we decided that the request method is no good...
  // Give a little extra bit on the message.
  return res.error(405, "Allowed methods: GET, POST, HEAD")

  // or maybe they just need to try again in 10 seconds
  return res.error(503, {'retry-after':10})

  // or maybe we are a teapot
  return res.error(418)

  // or maybe something threw
  try {
    blerg()
  } catch (er) {
    return res.error(er)
  }
})
```

Any arguments to the `res.error` function will be interpreted based on
their type:

* Number: the status code (defaults to 500, if it can't find one)
* Error object: Some error that was thrown or raised somewhere (with a
  stack, etc.)
* Other object: Bag o' headers which get set on the response.
* Function: A handler to use, instead of the one set up initially
* String: If there's a `res.template` from
  [Templar](https://github.com/isaacs/templar), and it's a valid
  template name, then it'll use the template as the handler.
* String that is not a template: A message (defaults to the `message`
  property on the Error object, if one was supplied, or the default
  message associated with the status code.)

The handler (or template) is called with the request and response
objects, and a `data` object containing:

```javascript
data = { message: message
       , code: code
       , statusCode: code
       , error: er
       , options: opts
       , request: req.method + ' ' + req.url
       , headers: req.headers
       , url: req.url
       }
```
