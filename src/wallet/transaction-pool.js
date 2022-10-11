function createTransactionPool() {
  const transactions = [];

  function add(transaction) {
    transactions.push(transaction);
  }

  return Object.freeze({
    transactions,
    add,
  });
}

module.exports = {
  createTransactionPool,
};
