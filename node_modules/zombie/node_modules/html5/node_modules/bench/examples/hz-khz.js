
exports.compare =
  { hz : function (cb) {
      setTimeout(cb, 1000)
    }
  , kHz: function (cb) {
      setTimeout(cb, 1)
    }
  }

require("../").runMain()
