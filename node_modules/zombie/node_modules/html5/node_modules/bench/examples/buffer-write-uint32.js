// new proposal for buffer.writeTYPE methods.

var cnt = 1024 * 32

Buffer.prototype.fastWriteUInt32 = function(value, offset, be) {
  if (be) {
    this[offset] = (value >>> 24) & 0xFF
    this[offset + 1] = (value >>> 16) & 0xFF
    this[offset + 2] = (value >>> 8) & 0xFF
    this[offset + 3] = value & 0xFF
  }
  else {
    this[offset] = value & 0xFF
    this[offset + 1] = (value >>> 8) & 0xFF
    this[offset + 2] = (value >>> 16) & 0xFF
    this[offset + 3] = (value >>> 24) & 0xFF
  }
}

exports.countPerLap = cnt

exports.compare =
  { "fast" : function () {
      var b = new Buffer(4)
      for (var i = 0; i < cnt; i ++) {
        b.fastWriteUInt32(i, 0, false);
      }
    }
  , "normal" : function () {
      var b = new Buffer(4)
      for (var i = 0; i < cnt; i ++) {
        b.writeUInt32(i, 0, 'little');
      }
    }
  }

require("../").runMain()

/*
*/
