const { createTransactionPool } = require("./transaction-pool");
const { createTransaction } = require("./transaction");
const { createWallet } = require("./index");

describe("Transaction Pool", () => {
  const wallet = createWallet();
  const transaction = createTransaction(wallet, "som3-4ddr3ss", 30);
  let subject;

  beforeEach(() => {
    subject = createTransactionPool();
    subject.add(transaction);
  });

  test("to add a transaction to the pool", () => {
    const foundTransaction = subject.transactions.find(
      (t) => t.id === transaction.id
    );
    expect(foundTransaction).toEqual(transaction);
  });
});
