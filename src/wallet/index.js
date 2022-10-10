const { genKeyPair } = require("../utils");
const { INITIAL_BALANCE } = require("../config");

function createWallet() {
  let balance = INITIAL_BALANCE;
  const keyPair = genKeyPair();
  const publicKey = keyPair.getPublic().encode("hex");

  return {
    publicKey,
    balance,
  };
}

module.exports = {
  createWallet,
};
