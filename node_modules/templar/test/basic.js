var tap = require('tap')
, http = require('http')
, Templar = require("../")
, ejs = require('ejs')
, request = require('request')
, PORT = process.env.PORT || 1337

, server = http.createServer(function (req, res) {
  res.template = Templar(req, res, { engine: ejs, folder: __dirname })

  // pluck the if-none-match off the headers, since
  // we'll be changing that one up.
  var h = Object.keys(req.headers).filter(function (k) {
    return k !== 'if-none-match'
  }).reduce(function (s, k) {
    s[k] = req.headers[k]
    return s
  }, {})

  console.error('SERVER', req.url)

  switch (req.url) {
    case '/foo':
      return res.template('foo.ejs', { headers: h })

    case '/404':
      return res.template('404.ejs', 404)

    case '/bar':
      res.setHeader('content-type', 'text/plain')
      return res.template('bar.ejs', { headers: h })

    case '/parts':
      return res.template('full.ejs')

    default:
      res.statusCode = 404
      return res.end()
  }
})

function req (url, cb) {
  if (typeof url === 'string') {
    url = {url: url}
  }
  url.url = 'http://localhost:' + PORT + url.url

  request(url, function (er, res, body) {
    if (er) throw er
    return cb(er, res, body)
  })
}

tap.test('setup', function (t) {
  server.listen(PORT, function () {
    t.pass('listening')
    t.end()
  })
})

var etag
tap.test('/foo first', function (t) {
  req('/foo', function (er, res, body) {
    etag = res.headers.etag
    t.ok(etag, 'has etag')
    t.equal(res.headers['content-type'], 'text/html')
    t.ok(res.headers.date)
    t.equal(res.headers.connection, 'keep-alive')
    t.equal(res.headers['transfer-encoding'], 'chunked')
    t.equal(body, '<html>\n'
                + '<body>\n'
                + '<h1>This is the land of the FOO</h1>\n'
                + '<pre>{"host":"localhost:' + PORT + '","content-length":"0","connection":"keep-alive"}</pre>\n'
                + '</body>\n'
                + '</html>\n')
    t.end()
  })
})

tap.test('/foo cached', function (t) {
  req({ headers: { 'if-none-match': etag }
      , url: '/foo' }, function (er, res, body) {
    t.equal(res.statusCode, 304)
    t.equal(body, undefined, 'no body')
    t.end()
  })
})

// assert that we *don't* get the same response when
// we change up the effective results
tap.test('/foo nocached', function (t) {
  req({ headers: { 'if-none-match': etag, 'x-foo': 'bar' }
      , url: '/foo' }, function (er, res, body) {
    t.equal(res.statusCode, 200)
    t.ok(res.headers.etag, 'has etag')
    t.equal(res.headers['content-type'], 'text/html')
    t.ok(res.headers.date)
    t.equal(res.headers.connection, 'keep-alive')
    t.equal(res.headers['transfer-encoding'], 'chunked')
    t.equal(body, '<html>\n'
                + '<body>\n'
                + '<h1>This is the land of the FOO</h1>\n'
                + '<pre>{"x-foo":"bar","host":"localhost:' + PORT + '","content-length":"0","connection":"keep-alive"}</pre>\n'
                + '</body>\n'
                + '</html>\n')
    t.end()
  })
})

tap.test('/404 page', function (t) {
  req('/404', function (er, res, body) {
    t.equal(res.statusCode, 404)
    t.ok(res.headers.etag, 'has etag')
    t.equal(res.headers['content-type'], 'text/html')
    t.ok(res.headers.date)
    t.equal(res.headers.connection, 'keep-alive')
    t.equal(res.headers['transfer-encoding'], 'chunked')
    t.equal(body, '<!DOCTYPE HTML BAZILLIONS>\n'
                + '<HTML MOTHERFUCKER>\n'
                + '<H1 STYLE=FONT-SIZE:OMGHUGE>404\'D!!!!\n')
    t.end()
  })
})

tap.test('/bar', function (t) {
  req('/bar', function (er, res, body) {
    t.equal(res.statusCode, 200)
    t.ok(res.headers.etag, 'has etag')
    t.equal(res.headers['content-type'], 'text/plain')
    t.ok(res.headers.date)
    t.equal(res.headers.connection, 'keep-alive')
    t.equal(res.headers['transfer-encoding'], 'chunked')
    t.equal(body, 'this is plain text.\n{"foo":"bar"}\n')
    t.end()
  })
})

tap.test('testing partials', function (t) {
  req('/parts', function (er, res, body) {
    t.equal(res.statusCode, 200)
    t.ok(res.headers.etag, 'has etag')
    t.equal(res.headers['content-type'], 'text/html')
    t.ok(res.headers.date)
    t.equal(res.headers.connection, 'keep-alive')
    t.equal(res.headers['transfer-encoding'], 'chunked')
    t.equal(body, '<!doctype html ALL UP IN YOUR FACE>\n'
                + '<html>\n'
                + '<head><title>yoyoyoyo</title>\n'
                + '<body>\n'
                + '<p>is for 1\n'
                + '\n'
                + '<p>is for 2\n'
                + '\n'
                + '<p>is for 3\n'
                + '\n'
                + '<p>is for 4\n'
                + '\n'
                + '<p>is for 5\n'
                + '\n'
                + '</body></html>\n')

    t.end()
  })
})

tap.test('shutdown', function (t) {
  server.close(function () {
    t.pass('server closed')
    t.end()
  })
})
