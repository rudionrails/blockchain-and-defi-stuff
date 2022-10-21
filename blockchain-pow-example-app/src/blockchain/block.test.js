const {
  createBlock,
  mineBlock,
  genesisBlock,
  adjustDifficulty,
} = require("./block");

const { MINE_RATE } = require("../config");

describe("Block", () => {
  const data = "mock data";
  const lastBlock = genesisBlock();
  let subject;

  beforeEach(() => {
    subject = mineBlock(lastBlock, data);
  });

  test("to set data to match the input", () => {
    expect(subject.data).toEqual(data);
  });

  test("to set `lastHash` to match the hash of the last block", () => {
    expect(subject.lastHash).toEqual(lastBlock.hash);
  });

  test("to generate a hash that matches the difficulty", () => {
    expect(subject.hash.substring(0, subject.difficulty)).toEqual(
      "0".repeat(subject.difficulty)
    );
  });

  test("to lower the difficulty for blocks mined too slow", () => {
    const time = subject.timestamp + MINE_RATE + 1;
    expect(adjustDifficulty(subject, time)).toEqual(subject.difficulty - 1);
  });

  test("to raise the difficulty for blocks mined too fast", () => {
    const time = subject.timestamp + MINE_RATE - 1;
    expect(adjustDifficulty(subject, time)).toEqual(subject.difficulty + 1);
  });
});
