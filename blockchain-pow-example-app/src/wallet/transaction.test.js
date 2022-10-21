const { MINING_REWARD } = require("../config");
const { createWallet, createBlockchainWallet } = require("./index");
const {
  createTransaction,
  createRewardTransaction,
  verifyTransaction,
} = require("./transaction");

describe("Transaction", () => {
  const amount = 50;
  const recipient = "r3c1p13nt";

  let wallet;
  let subject;

  beforeEach(() => {
    wallet = createWallet();
    subject = createTransaction(wallet, recipient, amount);
  });

  test("to output the `amount` subtracted from the wallet balance", () => {
    const output = subject.outputs.find((o) => o.address === wallet.publicKey);
    expect(output.amount).toEqual(wallet.balance() - amount);
  });

  test("outputs the `amount` added to the recipient", () => {
    const output = subject.outputs.find((o) => o.address === recipient);
    expect(output.amount).toEqual(amount);
  });

  test("to input the balance of the wallet", () => {
    expect(subject.input.amount).toEqual(wallet.balance());
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
  const amount = 50000;
  const recipient = "r3c1p13nt";

  let wallet;
  let subject;

  beforeEach(() => {
    wallet = createWallet();
    subject = createTransaction(wallet, recipient, amount);
  });

  test("to not create the transaction", () => {
    expect(subject).toBe(undefined);
  });
});

describe("Reward Transaction", () => {
  let minerWallet;
  let blockchainWallet;
  let subject;

  beforeEach(() => {
    minerWallet = createWallet();
    blockchainWallet = createBlockchainWallet();
    subject = createRewardTransaction(minerWallet, blockchainWallet);
  });

  test("to reward the miner's `wallet`", () => {
    const output = subject.outputs.find(
      (o) => (o.address = minerWallet.publicKey)
    );

    expect(output.amount).toEqual(MINING_REWARD);
  });
});
