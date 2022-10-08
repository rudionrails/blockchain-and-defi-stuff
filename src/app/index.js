const express = require("express");
const { createBlockchain } = require("../blockchain");

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const blockchain = createBlockchain();

app.get("/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});
