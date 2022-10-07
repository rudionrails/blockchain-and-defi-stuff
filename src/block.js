export function Block(timestamp, lastHash, hash, data) {
  return {
    toString() {
      return [
        "Block",
        `Timestamp:  ${timestamp}`,
        `Last Hash:  ${lastHash.substring(0, 10)}`,
        `Hash:       ${hash.substring(0, 10)}`,
        `Data:       ${data}`,
      ].join("\n  ");
    },
  };
}

export const genesis = Block("Genesis Time", "-----", "fir57-h4sh", []);

export function mine(lastBlock, data) {
  const timestamp = Date.now(); // new Date();
  const lastHash = lastBlock.hash;
  const hash = "todo-hash";

  return Block(timestamp, lastHash, hash, data);
}
