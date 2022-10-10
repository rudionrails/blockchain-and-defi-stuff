const { uuid, generateHash } = require("../utils");

function createTransaction(senderWallet, recipient, amount) {
  if (amount > senderWallet.balance) {
    console.log(`Amount ${amount} exceeds balance`);
    return;
  }

  const id = uuid();

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
    id,
    input,
    outputs,
  };
}

module.exports = {
  createTransaction,
};
