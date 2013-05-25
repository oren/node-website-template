module.exports = ErrorPage

var http = require('http')
, CODES = http.STATUS_CODES
, util = require('util')

function ErrorPage (req, res, opts) {
  opts = opts || {}
  return error

  function error () {
    var code, er, headers, message, handler
    for (var i = 0; i < arguments.length; i ++) {
      var arg = arguments[i]
      switch (typeof arg) {
        case 'number':
          code = arg
          break

        case 'string':
          if (res.template && res.template.has &&
              res.template.has(arg)) {
            handler = arg
          } else {
            message = arg
          }
          break

        case 'function':
          handler = arg
          break

        case 'object':
          if (!arg) break
          if (arg instanceof Error) {
            er = arg
          } else {
            headers = headers || {}
            Object.keys(arg).forEach(function (k) {
              if (k === 'statusCode' ||
                  k === 'cookie' ||
                  k === 'set-cookie') return
              headers[k] = arg[k]
            })
          }
          if (arg.statusCode && !code) code = arg.statusCode
          break
      }
    }

    if (!code) code = 500

    if (!message) {
      if (er) {
        message = er.message
      } else {
        message = CODES[code]
      }
    }

    // now we have the args we care about

    // we might have a templater or something hooked up
    var xx = Math.floor(code / 100) + 'xx'
    handler = handler ||
              opts[code] ||
              opts[xx] ||
              opts['*'] ||
              defHandler

    if (typeof handler === 'string') {
      // templar integration
      if (res.template && res.template.has &&
          res.template.has(handler)) {
        handler = (function (template) {
          return function (req, res, data) {
            res.template(template, data, code)
          }
        })(handler)
      } else {
        // just a random string.
        handler = (function (str) {
          return function (req, res, data) {
            res.end(str)
          }
        })(handler)
      }
    }

    res.statusCode = code
    if (headers) Object.keys(headers).forEach(function (k) {
      res.setHeader(k, headers[k])
    })


    var data =
      { message: message
      , code: code
      , statusCode: code
      , error: er
      , options: opts
      , request: req.method + ' ' + req.url
      , headers: req.headers
      , url: req.url
      }

    if (opts.debug) {
      data.stack = new Error(message).stack
    }

    return handler(req, res, data)
  }
}

// TODO: Maybe if there's a logger on the req/res already,
// it should use that?
function defHandler (req, res, data) {
  res.setHeader('content-type', 'text/plain')
  if (data.headers) {
    data.headers = Object.keys(data.headers).filter(function (k) {
      return k !== 'cookie' && k !== 'set-cookie'
    }).reduce(function (h, k) {
      h[k] = req.headers[k]
      return h
    }, {})
  }
  var d, m = data.code + ' ' + data.message + ' ' + req.url
    , logger = data.options.log || console.error
  d = util.inspect(data)
  logger(new Date().toISOString() + ' ' + m)
  if (data.options.debug) {
    m += '\n' + data.stack + '\n' + d
  }
  res.end(m + '\n')
}
