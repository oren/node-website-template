// testing the effect of using an ES5 Getter
// to get the parsedUrl on an object

var url = require("url")

function AutoParseUrl (u) {
  this.url = u
}
Object.defineProperty(AutoParseUrl.prototype, "parsedUrl", {get:function () {
  return url.parse(this.url)
}, enumerable:true })

function AutoParseCache (u) {
  this.url = u
}
Object.defineProperty(AutoParseCache.prototype, "parsedUrl", {get:function () {
  if (this._parsedUrl) return this._parsedUrl
  return this._parsedUrl = url.parse(this.url)
}, enumerable:true })

function AutoParseUrlQuery (u) {
  this.url = u
}
Object.defineProperty(AutoParseUrlQuery.prototype, "parsedUrl", {get:function () {
  return url.parse(this.url, true)
}, enumerable:true })

function AutoParseCacheQuery (u) {
  this.url = u
}
Object.defineProperty(AutoParseCacheQuery.prototype, "parsedUrl", {get:function () {
  if (this._parsedUrl) return this._parsedUrl
  return this._parsedUrl = url.parse(this.url, true)
}, enumerable:true })

function NoAutoParse (u) {
  this.url = u
}

var u = "/path/to?something=foo#hash-bazoo"
exports.compare =
  { "auto" : function () {
      var req = new AutoParseUrl(u)
      return [req.parsedUrl, req.parsedUrl, req.parsedUrl, req.parsedUrl]
    }
  , "autoCache" : function () {
      var req = new AutoParseCache(u)
      return [req.parsedUrl, req.parsedUrl, req.parsedUrl, req.parsedUrl]
    }
  , "autoQuery" : function () {
      var req = new AutoParseUrlQuery(u)
      return [req.parsedUrl, req.parsedUrl, req.parsedUrl, req.parsedUrl]
    }
  , "autoCacheQuery" : function () {
      var req = new AutoParseCacheQuery(u)
      return [req.parsedUrl, req.parsedUrl, req.parsedUrl, req.parsedUrl]
    }
  , "noAuto" : function () {
      var req = new NoAutoParse(u)
      return [url.parse(req.url), url.parse(req.url), url.parse(req.url)
             ,url.parse(req.url)]
    }
  , "noAutoCache" : function () {
      var req = new NoAutoParse(u)
        , up = url.parse(req.url)
      return [up, up, up, up]
    }
  , "noAutoCacheQuery" : function () {
      var req = new NoAutoParse(u)
        , up = url.parse(req.url, true)
      return [up, up, up, up]
    }
  , "noAutoQuery" : function () {
      var req = new NoAutoParse(u)
      return [url.parse(req.url, true), url.parse(req.url, true)
             ,url.parse(req.url, true), url.parse(req.url, true)]
    }
  }

require("../lib/bench").runMain()

/*
$ node expando-url.js 
benchmarking /Users/isaacs/dev-src/js/node-bench/examples/expando-url.js
Please be patient.
Scores: (bigger is better)

noAutoCache
Raw:
 > 219.90049751243782
 > 222.7772227772228
 > 223.10756972111554
 > 215.92039800995025
 > 227.09163346613545
Average (mean) 221.75946429737238

autoCache
Raw:
 > 153.69261477045907
 > 154.3824701195219
 > 154.84515484515484
 > 154.22885572139305
 > 154.69061876247505
Average (mean) 154.3679428438008

noAuto
Raw:
 > 57.53968253968254
 > 58.01376597836775
 > 59.701492537313435
 > 58.01376597836775
 > 59.9803343166175
Average (mean) 58.6498082700698

auto
Raw:
 > 49.95004995004995
 > 50
 > 49.75124378109453
 > 49.554013875123886
 > 49.65243296921549
Average (mean) 49.781548115096776

noAutoCacheQuery
Raw:
 > 18.26923076923077
 > 18.57282502443793
 > 18.57282502443793
 > 18.774703557312254
 > 18.88667992047714
Average (mean) 18.6152528591792

autoCacheQuery
Raw:
 > 17.22488038277512
 > 17.509727626459146
 > 17.857142857142858
 > 17.874875868917577
 > 17.907634307257304
Average (mean) 17.6748522085104

noAutoQuery
Raw:
 > 4.553734061930784
 > 4.6685340802987865
 > 4.672897196261682
 > 4.761904761904762
 > 4.748338081671415
Average (mean) 4.681081636413486

autoQuery
Raw:
 > 4.508566275924256
 > 4.6040515653775325
 > 4.566210045662101
 > 4.5787545787545785
 > 4.6992481203007515
Average (mean) 4.591366117203843

Winner: noAutoCache
Compared with next highest (autoCache), it's:
30.39% faster
1.44 times as fast
0.16 order(s) of magnitude faster

Compared with the slowest (autoQuery), it's:
97.93% faster
48.3 times as fast
1.68 order(s) of magnitude faster

*/
