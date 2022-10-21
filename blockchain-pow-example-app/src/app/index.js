const express = require("express");
const bodyParser = require("body-parser");

const { createBlockchain } = require("../blockchain");
const { createP2pServer } = require("../p2p-server");
const { createTransactionPool } = require("../wallet/transaction-pool");
const { createWallet, createTransactionCreator } = require("../wallet");
const { createMiner } = require("./miner");

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const blockchain = createBlockchain();
const wallet = createWallet();
const transactionPool = createTransactionPool();
const createTransaction = createTransactionCreator(
  wallet,
  blockchain,
  transactionPool
);

const app = express();
const p2pServer = createP2pServer(blockchain, transactionPool);
const miner = createMiner(blockchain, transactionPool, wallet, p2pServer);

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
  const block = miner.mine();

  console.log("New blpock has mined added", block);

  // res.status(201).send("Block mined");
  res.redirect("/blocks");
});

// app.post("/mine", (req, res) => {
//   const { data } = req.body;
//   const block = blockchain.addBlock(data);
//   console.log("New block added:", block);
//
//   p2pServer.syncChains();
//
//   // res.status(201).send("Block created");
//   res.redirect("/blocks");
// });

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});

p2pServer.listen();
