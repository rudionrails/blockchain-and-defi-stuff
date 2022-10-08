const { createBlockchain } = require("./blockchain");
const { genesisBlock } = require("./block");

describe("Blockchain", () => {
  const data = "mock data";
  let subject;

  beforeEach(() => {
    subject = createBlockchain();
  });

  test("to start wiht genesis block", () => {
    expect(subject.chain[0]).toEqual(genesisBlock());
  });

  test("addBlock to add a new block", () => {
    subject.addBlock(data);

    const lastBlock = subject.chain[subject.chain.length - 1];
    expect(lastBlock.data).toEqual(data);
  });
});
