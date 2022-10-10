const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const { v1: uuidV1 } = require("uuid");

const ec = new EC("secp256k1");

function genKeyPair() {
  return ec.genKeyPair();
}

function uuid() {
  return uuidV1();
}

function generateHash(data) {
  return SHA256(JSON.stringify(data)).toString();
}

module.exports = {
  genKeyPair,
  uuid,
  generateHash,
};
