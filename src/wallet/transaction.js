const { uuid, generateHash, verifySignature } = require("../utils");
const { MINING_REWARD } = require("../config");

function newTransaction(senderWallet, amount, outputs) {
  if (amount > senderWallet.balance) {
    console.log(`Amount ${amount} exceeds balance`);
    return;
  }

  const input = {
    timestamp: Date.now(),
    amount: senderWallet.balance,
    address: senderWallet.publicKey,
    signature: senderWallet.sign(generateHash(outputs)),
  };

  return {
    id: uuid(),
    input,
    outputs,
  };
}

function createTransaction(senderWallet, recipient, amount) {
  const outputs = [
    {
      amount: senderWallet.balance - amount,
      address: senderWallet.publicKey,
    },
    {
      amount,
      address: recipient,
    },
  ];

  return newTransaction(senderWallet, amount, outputs);
}

function createRewardTransaction(minerWallet, blockchainWallet) {
  const outputs = [
    {
      amount: MINING_REWARD,
      address: minerWallet.publicKey,
    },
  ];

  return newTransaction(blockchainWallet, MINING_REWARD, outputs);
}

function verifyTransaction(transaction) {
  const { address, signature } = transaction.input;

  return verifySignature(address, signature, generateHash(transaction.outputs));
}

module.exports = {
  createTransaction,
  createRewardTransaction,
  verifyTransaction,
};
