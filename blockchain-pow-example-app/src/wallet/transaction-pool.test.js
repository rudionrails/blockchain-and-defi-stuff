const { createBlockchain } = require("../blockchain");
const { createTransactionPool } = require("./transaction-pool");
const { createWallet, createTransactionCreator } = require("./index");

describe("Transaction Pool", () => {
  let createTransaction;
  let transaction;

  let wallet;
  let blockchain;
  let subject;

  beforeEach(() => {
    wallet = createWallet();
    blockchain = createBlockchain();
    subject = createTransactionPool();
    createTransaction = createTransactionCreator(wallet, blockchain, subject);
    transaction = createTransaction("som3-4ddr3ss", 30);
  });

  test("to add a transaction to the pool", () => {
    const foundTransaction = subject.transactions.find(
      (t) => t.id === transaction.id
    );
    expect(foundTransaction).toEqual(transaction);
  });

  test("to clear the transactions", () => {
    subject.clear();

    expect(subject.transactions).toEqual([]);
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
      expect(subject.validTransactions()).toEqual(validTransactions);
    });
  });
});
