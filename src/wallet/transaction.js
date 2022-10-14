const { uuid, generateHash, verifySignature } = require("../utils");

function createTransaction(senderWallet, recipient, amount) {
  if (amount > senderWallet.balance) {
    console.log(`Amount ${amount} exceeds balance`);
    return;
  }

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

function verifyTransaction(transaction) {
  const { address, signature } = transaction.input;

  return verifySignature(address, signature, generateHash(transaction.outputs));
}

module.exports = {
  createTransaction,
  verifyTransaction,
};
