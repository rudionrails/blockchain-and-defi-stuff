const { INITIAL_BALANCE } = require("../config");
const { genKeyPair } = require("../utils");
const { createTransaction } = require("./transaction");

function createWallet() {
  let balance = INITIAL_BALANCE;
  const keyPair = genKeyPair();
  const publicKey = keyPair.getPublic().encode("hex");

  return {
    publicKey,
    balance,

    sign(dataHash) {
      return keyPair.sign(dataHash);
    },
  };
}

function createBlockchainWallet() {
  const wallet = createWallet();
  wallet.address = "blockchain-wallet";

  return wallet;
}

const createTransactionCreator =
  (wallet, transactionPool) => (recipient, amount) => {
    const transaction = createTransaction(wallet, recipient, amount);
    transactionPool.add(transaction);

    return transaction;
  };

module.exports = {
  createWallet,
  createBlockchainWallet,
  createTransactionCreator,
};
