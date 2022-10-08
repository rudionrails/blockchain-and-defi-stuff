const Websocket = require("ws");

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

function createP2pServer(blockchain) {
  const sockets = [];

  function connectSocket(socket) {
    sockets.push(socket);
    console.log("Socket connected");

    messageHandler(socket);
    sendChain(socket);
  }

  function connectPeers() {
    peers.forEach((peer) => {
      const socket = new Websocket(peer);
      socket.on("open", () => connectSocket(socket));
    });
  }

  function messageHandler(socket) {
    socket.on("message", (message) => {
      const data = JSON.parse(message);
      blockchain.replaceChain(data);
    });
  }

  function sendChain(socket) {
    socket.send(JSON.stringify(blockchain.chain));
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
        sendChain(socket);
      });
    },
  };
}

module.exports = {
  createP2pServer,
};
