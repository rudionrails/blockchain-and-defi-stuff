const sha256 = require("crypto-js/sha256");

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
  const hash = sha256(`${timestamp}-${lastHash}-${data}`).toString();

  return createBlock(timestamp, lastHash, hash, data);
}

module.exports = {
  createBlock,
  mineBlock,
  genesisBlock,
};
