import { Block, genesis, mine } from "./src/block.js";

const foo = mine(genesis, "foo");
console.log(foo.toString());
