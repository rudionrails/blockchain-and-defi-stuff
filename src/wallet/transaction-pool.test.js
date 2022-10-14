const { createTransactionPool } = require("./transaction-pool");
const { createWallet, createTransactionCreator } = require("./index");

describe("Transaction Pool", () => {
  const wallet = createWallet();
  let createTransaction;
  let transaction;
  let subject;

  beforeEach(() => {
    subject = createTransactionPool();
    createTransaction = createTransactionCreator(wallet, subject);
    transaction = createTransaction("som3-4ddr3ss", 30);
  });

  test("to add a transaction to the pool", () => {
    const foundTransaction = subject.transactions.find(
      (t) => t.id === transaction.id
    );
    expect(foundTransaction).toEqual(transaction);
  });

  describe("with valid and invalid transactions", () => {
    let validTransactions;

    beforeEach(() => {
      validTransactions = [...subject.transactions];

      for (let i = 0; i < 1; i++) {
        const tx = createTransaction("some-other-address", 30);

        if (i % 2 === 0) {
          tx.input.amount = 99999; // corrupt transaction
        } else {
          validTransactions.push(tx);
        }
      }
    });

    test("to show a difference between valid and corrupt transactions", () => {
      expect(JSON.stringify(subject.transactions)).not.toEqual(
        JSON.stringify(validTransactions)
      );
    });

    test("to grab valid transactions", () => {
      console.log("validTx", subject.validTransactions());

      expect(subject.validTransactions()).toEqual(validTransactions);
    });
  });
});
