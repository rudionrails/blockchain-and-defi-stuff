const { createBlockchain } = require("./src/blockchain");

const blockchain = createBlockchain();

for (let i = 0; i < 10; i++) {
  blockchain.addBlock(`foo ${i}`);
}
