const sha256 = require("crypto-js/sha256");
const { DIFFICULTY } = require("../config");

const createHash = (timestamp, lastHash, data, nonce) =>
  sha256(`${timestamp}-${lastHash}-${data}-${nonce}`).toString();

function createBlock(timestamp, lastHash, hash, data, nonce) {
  return {
    timestamp,
    lastHash,
    hash,
    data,
    nonce,
  };
}

function genesisBlock() {
  return createBlock("Genesis Time", "-----", "fir57-h45h", [], 0);
}

function mineBlock(lastBlock, data) {
  const lastHash = lastBlock.hash;

  let nonce = 0;
  let timestamp;
  let hash;

  // proof of work algorithm
  do {
    nonce++;
    timestamp = Date.now();
    hash = createHash(timestamp, lastHash, data, nonce);
  } while (hash.substring(0, DIFFICULTY) !== "0".repeat(DIFFICULTY));

  return createBlock(timestamp, lastHash, hash, data, nonce);
}

function blockHash(block) {
  const { timestamp, lastHash, data, nonce } = block;

  return createHash(timestamp, lastHash, data, nonce);
}

module.exports = {
  createBlock,
  mineBlock,
  blockHash,
  genesisBlock,
};
