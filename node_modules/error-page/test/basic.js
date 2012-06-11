var tap = require('tap')
, http = require('http')
, request = require('request')
, Templar = require('templar')
, ejs = require('ejs')
, EP = require('../error-page.js')
, PORT = process.env.PORT || 1337
, server

Templar.loadFolder(__dirname)

tap.test('setup', function (t) {
  server = http.createServer(function (req, res) {
    res.template = Templar(req, res,
      { engine: ejs
      , folder: __dirname })

    res.error = new EP(req, res,
      { debug: true
      , 503: function (req, res, data) {
          if (!res.getHeader('retry-after')) {
            res.setHeader('retry-after', 10)
          }
          res.end("503'D!!")
        }
      , 400: "that was bad."
      , 403: "forbidden.ejs"
      })

    switch (req.url) {
      case '/503': return res.error(503)
      case '/503-long': return res.error(503, {'retry-after':1000})
      case '/400': return res.error(400)
      case '/404': return res.error(404)
      case '/403': return res.error(403)
      case '/410-msg': return res.error('some error', 410)
      case '/errobj': return res.error(new Error('errobj'))
      case '/err-401': return res.error(401, new Error('401'))
      case '/err-header':
        return res.error(413, new Error('413'), {'x-foo': 'bar'})
    }

    throw new Error('wtf? ' + req.url)
  })

  server.listen(PORT, function () {
    t.pass('server listening')
    t.end()
  })
})

function req (p, cb) {
  request('http://localhost:' + PORT + p, cb)
}

tap.test('/404', function (t) {
  req('/404', function (er, res, data) {
    if (er) throw er
    t.equal(res.statusCode, 404)
    var lines = data.split('\n')
    t.equal(lines[0], '404 Not Found /404')
    t.equal(lines[1], 'Error: Not Found')
    t.like(lines[2],
      /^    at ServerResponse.error \(.*?error-page\.js:\d+:\d+\)$/)
    t.end()
  })
})

tap.test('/410-msg', function (t) {
  req('/410-msg', function (er, res, data) {
    if (er) throw er
    t.equal(res.statusCode, 410)
    var lines = data.split('\n')
    t.equal(lines[0], '410 some error /410-msg')
    t.equal(lines[1], 'Error: some error')
    t.like(lines[2],
      /^    at ServerResponse.error \(.*?error-page\.js:\d+:\d+\)$/)
    t.end()
  })
})

tap.test('/403', function (t) {
  req('/403', function (er, res, data) {
    if (er) throw er
    t.equal(res.statusCode, 403)

    t.has(res.headers, { 'content-type': 'text/html',
                         connection: 'keep-alive',
                         'transfer-encoding': 'chunked' })
    t.ok(res.headers.etag, 'has etag')
    t.ok(res.headers.date, 'has data')

    t.equal(data, '<html><h1>YOU SHALL NOT PASS!</h1>\n'
                + '<pre>{\n'
                + '  "message": "Forbidden",\n'
                + '  "code": 403,\n'
                + '  "statusCode": 403,\n'
                + '  "options": {\n'
                + '    "400": "that was bad.",\n'
                + '    "403": "forbidden.ejs",\n'
                + '    "debug": true\n'
                + '  },\n'
                + '  "request": "GET /403",\n'
                + '  "headers": {\n'
                + '    "host": "localhost:1337",\n'
                + '    "content-length": "0",\n'
                + '    "connection": "keep-alive"\n'
                + '  },\n'
                + '  "url": "/403"\n'
                + '}</pre>\n')

    t.end()
  })
})

tap.test('/503', function (t) {
  req('/503', function (er, res, data) {
    if (er) throw er
    t.equal(res.statusCode, 503)
    t.equal(res.headers['retry-after'], '10')
    t.equal(data, "503'D!!")
    t.end()
  })
})

tap.test('/503-long', function (t) {
  req('/503-long', function (er, res, data) {
    if (er) throw er
    t.equal(res.statusCode, 503)
    t.equal(res.headers['retry-after'], '1000')
    t.equal(data, "503'D!!")
    t.end()
  })
})

tap.test('/400', function (t) {
  req('/400', function (er, res, data) {
    if (er) throw er
    t.equal(res.statusCode, 400)
    t.equal(data, 'that was bad.')
    t.end()
  })
})

tap.test('/errobj', function (t) {
  req('/errobj', function (er, res, data) {
    if (er) throw er
    t.equal(res.statusCode, 500)
    t.like(data, /^500 Error: errobj/)
    t.end()
  })
})

tap.test('/err-401', function (t) {
  req('/err-401', function (er, res, data) {
    if (er) throw er
    t.equal(res.statusCode, 401)
    t.like(data, /^401 Error: 401/)
    t.end()
  })
})

tap.test('/err-header', function (t) {
  req('/err-header', function (er, res, data) {
    if (er) throw er
    t.equal(res.statusCode, 413)
    t.like(data, /^413 Error: 413/)
    t.equal(res.headers['x-foo'], 'bar')
    t.end()
  })
})



tap.test('teardown', function (t) {
  server.close(function () {
    t.pass('server closed')
    t.end()
  })
})
