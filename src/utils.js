const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const { v1: uuidV1 } = require("uuid");

const ec = new EC("secp256k1");

const genKeyPair = () => ec.genKeyPair();
const uuid = () => uuidV1();
const generateHash = (data) => SHA256(JSON.stringify(data)).toString();
const verifySignature = (publicKey, signature, dataHash) =>
  ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature);

module.exports = {
  genKeyPair,
  uuid,
  generateHash,
  verifySignature,
};
