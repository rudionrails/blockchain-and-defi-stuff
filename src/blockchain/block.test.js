const { createBlock, mineBlock, genesisBlock } = require("./block");
const { DIFFICULTY } = require("../config");

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
    expect(subject.hash.substring(0, DIFFICULTY)).toEqual(
      "0".repeat(DIFFICULTY)
    );
  });
});
