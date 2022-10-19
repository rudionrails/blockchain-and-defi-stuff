const { INITIAL_BALANCE } = require("../config");
const { genKeyPair } = require("../utils");
const { createTransaction } = require("./transaction");

function calculateBalance(currentBalance, publicKey, blockchain) {
  let newBalance = currentBalance;
  let startTime = 0;

  // blockchain.chain.forEach((block) =>
  //   block.data.forEach(transaction => transaction.push(transaction);
  // );
  const transactions = blockchain.chain.reduce(
    (acc, block) => acc.concat(block.data),
    []
  );

  const walletInputTransactions = transactions.filter(
    (transaction) => transaction.input.address === publicKey
  );

  if (walletInputTransactions.length > 0) {
    const recentInputTransaction = walletInputTransactions.reduce(
      (prev, current) =>
        prev.input.timestamp > current.input.timestamp ? prev : current
    );

    startTime = recentInputTransaction.input.timestamp;
    newBalance = recentInputTransaction.outputs.find(
      (output) => output.address === publicKey
    ).amount;
  }

  transactions.forEach((transaction) => {
    if (transaction.input.timestamp > startTime) {
      transaction.outputs.find((output) => {
        if (output.address === publicKey) {
          newBalance += output.amount;
        }
      });
    }
  });

  return newBalance;
}

function createWallet() {
  let balance = INITIAL_BALANCE;
  const keyPair = genKeyPair();
  const publicKey = keyPair.getPublic().encode("hex");

  return {
    publicKey,

    balance: () => balance,
    updateBalance: (blockchain) => {
      balance = calculateBalance(balance, publicKey, blockchain);
      return balance;
    },

    sign: (dataHash) => keyPair.sign(dataHash),
  };
}

function createBlockchainWallet() {
  const wallet = createWallet();
  wallet.address = "blockchain-wallet";

  return wallet;
}

const createTransactionCreator =
  (wallet, blockchain, transactionPool) => (recipient, amount) => {
    wallet.updateBalance(blockchain);

    const transaction = createTransaction(wallet, recipient, amount);
    transactionPool.add(transaction);

    return transaction;
  };

module.exports = {
  createWallet,
  createBlockchainWallet,
  createTransactionCreator,
};
