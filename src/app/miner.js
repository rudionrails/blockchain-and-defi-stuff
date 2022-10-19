const { createBlockchainWallet } = require("../wallet");
const { createRewardTransaction } = require("../wallet/transaction");

function createMiner(blockchain, transactionPool, wallet, p2pServer) {
  function mine() {
    const validTransactions = transactionPool.validTransactions();

    // TODO: include a reward for the miner
    const blockchainWallet = createBlockchainWallet();
    const rewardTransaction = createRewardTransaction(wallet, blockchainWallet);

    validTransactions.push(rewardTransaction);

    // TODO: create a block consisting of the valid transactions
    const block = blockchain.addBlock(validTransactions);

    // TODO: syn chains in p2p server
    p2pServer.syncChains();

    // TODO: clear the transaction pool & broadcast to every miner
    transactionPool.clear();
    p2pServer.broadcastClearTransactions();

    return block;
  }

  return {
    mine,
  };
}

module.exports = { createMiner };
