const express = require("express");
const bodyParser = require("body-parser");

const { createBlockchain } = require("../blockchain");
const { createP2pServer } = require("../p2p-server");
const { createWallet } = require("../wallet");
const { createTransactionPool } = require("../wallet/transaction-pool");

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const wallet = createWallet();
const transactionPool = createTransactionPool();
const createTransaction = createTransactionCreator(wallet, transactionPool);
const blockchain = createBlockchain();

const app = express();
const p2pServer = createP2pServer(blockchain, transactionPool);

app.use(bodyParser.json());

app.get("/public-key", (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});

app.get("/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.get("/transactions", (req, res) => {
  res.json(transactionPool.transactions);
});

app.post("/transaction", (req, res) => {
  const { recipient, amount } = req.body;

  const transaction = createTransaction(recipient, amount);
  p2pServer.broadcastTransaction(transaction);

  // res.status(201).send("Transaction created");
  res.redirect("/transactions");
});

app.post("/mine", (req, res) => {
  const { data } = req.body;
  const block = blockchain.addBlock(data);
  console.log("New block added:", block);

  p2pServer.syncChains();

  // res.status(201).send("Block created");
  res.redirect("/blocks");
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});

p2pServer.listen();
