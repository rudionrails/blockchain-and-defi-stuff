const { genesisBlock, mineBlock, blockHash } = require("./block");

function isValidChain(chain) {
  if (JSON.stringify(chain[0]) !== JSON.stringify(genesisBlock())) return false;

  for (let i = 1; i < chain.length; i++) {
    const block = chain[i];
    const lastBlock = chain[i - 1];

    if (block.lastHash !== lastBlock.hash) return false;
    if (block.hash !== blockHash(block)) return false;
  }

  return true;
}

function createBlockchain() {
  const chain = [genesisBlock()];

  return {
    chain,

    addBlock(data) {
      const block = mineBlock(chain[chain.length - 1], data);
      chain.push(block);

      return block;
    },

    replaceChain(newChain) {
      if (newChain.length <= chain.length) {
        console.error("Received chain is not longer than the current chain");

        return;
      }

      if (!isValidChain(newChain)) {
        console.error("Received chain is not valid");

        return;
      }

      console.log("Replacing blockchain with new chain");
      chain.splice(0, chain.length, ...newChain);
    },
  };
}

module.exports = {
  createBlockchain,
  isValidChain,
};
