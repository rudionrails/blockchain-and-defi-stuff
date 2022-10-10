const { genKeyPair } = require("../utils");
const { INITIAL_BALANCE } = require("../config");

function createWallet() {
  let balance = INITIAL_BALANCE;
  const keyPair = genKeyPair();
  const publicKey = keyPair.getPublic().encode("hex");

  function sign(dataHash) {
    return keyPair.sign(dataHash);
  }

  return {
    publicKey,
    balance,
    sign,
  };
}

module.exports = {
  createWallet,
};
