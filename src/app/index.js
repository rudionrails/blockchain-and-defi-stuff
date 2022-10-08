const express = require("express");
const bodyParser = require("body-parser");
const { createBlockchain } = require("../blockchain");
const { createP2pServer } = require("../p2p-server");

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const blockchain = createBlockchain();
const p2pServer = createP2pServer(blockchain);

app.use(bodyParser.json());

app.get("/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/mine", (req, res) => {
  const block = blockchain.addBlock(req.body.data);
  console.log("New block added:", block);

  p2pServer.syncChains();
  res.status(201).send("Block created");
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});

p2pServer.listen();
