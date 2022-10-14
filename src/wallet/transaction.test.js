const { createTransaction, verifyTransaction } = require("./transaction");
const { createWallet } = require("./index");

describe("Transaction", () => {
  const wallet = createWallet();
  const amount = 50;
  const recipient = "r3c1p13nt";

  let subject;

  beforeEach(() => {
    subject = createTransaction(wallet, recipient, amount);
  });

  test("to output the `amount` subtracted from the wallet balance", () => {
    const output = subject.outputs.find((o) => o.address === wallet.publicKey);
    expect(output.amount).toEqual(wallet.balance - amount);
  });

  test("outputs the `amount` added to the recipient", () => {
    const output = subject.outputs.find((o) => o.address === recipient);
    expect(output.amount).toEqual(amount);
  });

  test("to input the balance of the wallet", () => {
    expect(subject.input.amount).toEqual(wallet.balance);
  });

  test("to validate the transaction", () => {
    expect(verifyTransaction(subject)).toBe(true);
  });

  test("to invalidate a corrupt transaction", () => {
    subject.outputs[0].amount = 50000;
    expect(verifyTransaction(subject)).toBe(false);
  });
});

describe("Transaction with too high amount", () => {
  const wallet = createWallet();
  const amount = 50000;
  const recipient = "r3c1p13nt";

  let subject;

  beforeEach(() => {
    subject = createTransaction(wallet, recipient, amount);
  });

  test("to not create the transaction", () => {
    expect(subject).toBe(undefined);
  });
});
