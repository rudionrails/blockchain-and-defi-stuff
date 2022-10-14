const Websocket = require("ws");

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
const MESSAGE_TYPES = {
  CHAIN: "CHAIN",
  TRANSACTION: "TRANSACTION",
};

function sendChain(socket, blockchain) {
  socket.send(
    JSON.stringify({
      type: MESSAGE_TYPES.CHAIN,
      data: blockchain.chain,
    })
  );
}

function sendTransaction(socket, transaction) {
  socket.send(
    JSON.stringify({
      type: MESSAGE_TYPES.TRANSACTION,
      data: transaction,
    })
  );
}

function createP2pServer(blockchain, transactionPool) {
  const sockets = [];

  function connectSocket(socket) {
    console.log("Socket connected");
    sockets.push(socket);

    handleMessage(socket);
    sendChain(socket, blockchain);
  }

  function connectPeers() {
    peers.forEach((peer) => {
      const socket = new Websocket(peer);
      socket.on("open", () => connectSocket(socket));
    });
  }

  function handleMessage(socket) {
    socket.on("message", (message) => {
      const { type, data } = JSON.parse(message);
      console.log("Message:", type, data);

      if (type === MESSAGE_TYPES.CHAIN) {
        blockchain.replaceChain(data);
      } else if (type === MESSAGE_TYPES.TRANSACTION) {
        transactionPool.add(data);
      }
    });
  }

  return {
    listen() {
      const server = new Websocket.Server({ port: P2P_PORT });
      server.on("connection", (socket) => connectSocket(socket));

      connectPeers();

      console.log(`Listening for p2p connections on: ${P2P_PORT}`);
    },

    syncChains() {
      sockets.forEach((socket) => {
        sendChain(socket, blockchain);
      });
    },

    broadcastTransaction(transaction) {
      sockets.forEach((socket) => {
        sendTransaction(socket, transaction);
      });
    },
  };
}

module.exports = {
  createP2pServer,
};
