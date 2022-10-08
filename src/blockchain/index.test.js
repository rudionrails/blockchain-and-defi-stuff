const { createBlockchain, isValidChain } = require("./index");
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

  test("to validate a chain", () => {
    subject.addBlock("invalid block");

    expect(isValidChain(subject.chain)).toBe(true);
  });

  test("to invalidate a chain with corrupt genesis block", () => {
    subject.chain[0].data = "Bad data";

    expect(isValidChain(subject.chain)).toBe(false);
  });

  test("to invalidate a corrupt chain", () => {
    subject.addBlock("foo");
    subject.chain[1].data = "Not foo";

    expect(isValidChain(subject.chain)).toBe(false);
  });

  test("to replace the chain with a valid new chain", () => {
    const newBlockchain = createBlockchain();
    newBlockchain.addBlock("foo");

    subject.replaceChain(newBlockchain.chain);

    expect(subject.chain).toEqual(newBlockchain.chain);
  });

  test("to not replace the chain if new chain is same length or shorter", () => {
    const newBlockchain = createBlockchain();
    subject.addBlock("foo");
    subject.replaceChain(newBlockchain.chain);

    expect(subject.chain).not.toEqual(newBlockchain.chain);
  });
});
