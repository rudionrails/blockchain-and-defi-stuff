const sha256 = require("crypto-js/sha256");

const createHash = (timestamp, lastHash, data) =>
  sha256(`${timestamp}-${lastHash}-${data}`).toString();

function createBlock(timestamp, lastHash, hash, data) {
  return {
    timestamp,
    lastHash,
    hash,
    data,
  };
}

function genesisBlock() {
  return createBlock("Genesis Time", "-----", "fir57-h45h", []);
}

function mineBlock(lastBlock, data) {
  const timestamp = Date.now();
  const lastHash = lastBlock.hash;
  const hash = createHash(timestamp, lastHash, data);

  return createBlock(timestamp, lastHash, hash, data);
}

function blockHash(block) {
  const { timestamp, lastHash, data } = block;

  return createHash(timestamp, lastHash, data);
}

module.exports = {
  createBlock,
  mineBlock,
  blockHash,
  genesisBlock,
};
