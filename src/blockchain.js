const { genesisBlock, mineBlock } = require("./block");

function createBlockchain() {
  const chain = [genesisBlock()];

  return {
    chain,

    addBlock(data) {
      const block = mineBlock(chain[chain.length - 1], data);
      chain.push(block);

      return block;
    },
  };
}

module.exports = {
  createBlockchain,
};
