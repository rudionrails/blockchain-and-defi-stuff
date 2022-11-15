// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const { chainId } = hre.network.config;
console.log(hre.network.config);

async function main() {
  const SimpleStorageFactory = await hre.ethers.getContractFactory(
    "SimpleStorage"
  );
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();

  console.log("SimpleStorage deployed to", simpleStorage.address);

  // 5 is the ethereum goerli test network chain id
  if (chainId === 5 && process.env.ETHERSCAN_API_KEY !== "") {
    await simpleStorage.deployTransaction.wait(6); // wait 6 blocks
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`current value: ${currentValue}`);

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);

  const updatedValue = await simpleStorage.retrieve();
  console.log(`updated value: ${updatedValue}`);
}

async function verify(address, constructorArguments) {
  console.log("Verifying contract");

  try {
    await hre.run("verify:verify", {
      address,
      constructorArguments,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("already verified");
    } else {
      console.error(e);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
