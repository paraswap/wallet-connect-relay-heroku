const crypto = require("crypto");
const encUtils = require("enc-utils");

function generateRandomTopic() {
  return encUtils.bufferToHex(crypto.randomBytes(32));
}

module.exports = { generateRandomTopic }