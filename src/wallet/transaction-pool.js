const { verifyTransaction } = require("./transaction");

function createTransactionPool() {
  const transactions = [];

  function add(transaction) {
    transactions.push(transaction);
  }

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
    add,
    validTransactions,
  });
}

module.exports = {
  createTransactionPool,
};
