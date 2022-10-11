const { genKeyPair } = require("../utils");
const { INITIAL_BALANCE } = require("../config");

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

// function createTransaction(recipient, amount, transactionPool) {
//   if (amount > balance) {
//     console.log(`Amount ${amount} exceeds the balance (${balance})`);
//     return;
//   }
//
//   const transaction = createTransaction(wallet, recipient, amount);
//   transactionPool.push(transaction);
// }

module.exports = {
  createWallet,
};
