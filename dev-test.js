const { Block, genesis, mine } = require("./src/block");

const foo = mine(genesis, "foo");
console.log(foo.toString());
