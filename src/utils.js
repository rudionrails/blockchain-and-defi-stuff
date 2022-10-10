const EC = require("elliptic").ec;

const ec = new EC("secp256k1");

function genKeyPair() {
  return ec.genKeyPair();
}

module.exports = {
  genKeyPair,
};
