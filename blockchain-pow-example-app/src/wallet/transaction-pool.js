const { verifyTransaction } = require("./transaction");

function createTransactionPool() {
  const transactions = [];

  function validTransactions() {
    return transactions.filter((transaction) => {
      const outputTotal = transaction.outputs.reduce(
        (sum, output) => sum + output.amount,
        0
      );

      if (transaction.input.amount !== outputTotal) {
        console.log(
          "Invalid transaction amount from",
          transaction.input.address
        );
        return;
      }

      if (!verifyTransaction(transaction)) {
        console.log(
          "Invalid transaction signature from",
          transaction.input.address
        );
        return;
      }

      return transaction;
    });
  }

  return Object.freeze({
    transactions,
    validTransactions,

    add(transaction) {
      transactions.push(transaction);
    },

    clear() {
      transactions.splice(0, transactions.length);
    },
  });
}

module.exports = {
  createTransactionPool,
};
