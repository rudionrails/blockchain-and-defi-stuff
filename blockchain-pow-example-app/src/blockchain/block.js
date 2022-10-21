const { DIFFICULTY, MINE_RATE } = require("../config");
const { generateHash } = require("../utils");

const createHash = (timestamp, lastHash, data, nonce, difficulty) =>
  generateHash(
    `${timestamp}-${lastHash}-${data}-${nonce}-${difficulty}`
  ).toString();

function createBlock(timestamp, lastHash, hash, data, nonce, difficulty) {
  return {
    timestamp,
    lastHash,
    hash,
    data,
    nonce,
    difficulty,
  };
}

function genesisBlock() {
  return createBlock("Genesis Time", "-----", "fir57-h45h", [], 0, DIFFICULTY);
}

function adjustDifficulty(block, currentTime) {
  const { difficulty, timestamp } = block;

  return timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
}

function mineBlock(lastBlock, data) {
  const lastHash = lastBlock.hash;
  let difficulty = lastBlock.difficulty;
  let nonce = 0;
  let timestamp;
  let hash;

  // proof of work algorithm
  do {
    nonce++;
    timestamp = Date.now();
    difficulty = adjustDifficulty(lastBlock, timestamp);
    hash = createHash(timestamp, lastHash, data, nonce);
  } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

  return createBlock(timestamp, lastHash, hash, data, nonce, difficulty);
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
  adjustDifficulty,
};
