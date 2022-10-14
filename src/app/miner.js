function createMiner(blockchain, transactionPool, wallet, p2pServer) {
  function mine() {
    const validTransactions = transactionPool.validTransactions();
    // TODO: include a reward for the miner
    // TODO: create a block consisting of the valid transactions
    // TODO: syn chains in p2p server
    // TODO: clear the transaction pool & broadcast to every miner
  }

  return {
    mine,
  }
}

module.exports { createMiner };
