const ethers = require("ethers");
const fs = require("fs-extra");

require("@yummy/dotenv/config");

const JSON_FILENAME = ".encryptedKey.json";
const ABI_FILENAME = "SimpleStorage_sol_SimpleStorage.abi";
const BIN_FILENAME = "SimpleStorage_sol_SimpleStorage.bin";

// make sure you run ganache, locally
async function main() {
  const encryptedJsonKey = await fs.readFile(JSON_FILENAME, "utf8");
  const abi = await fs.readFile(ABI_FILENAME, "utf8");
  const binary = await fs.readFile(BIN_FILENAME, "utf8");

  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJsonKey,
    process.env.PRIVATE_KEY_PASSWORD
  ).connect(provider);

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploying contract");
  const contract = await contractFactory.deploy();
  const deploymentReceipt = await contract.deployTransaction.wait();
  // console.log("Deployment Transaction", contract.deployTransaction);
  // console.log("Transaction Receipt", deploymentReceipt);

  const favoriteNumber = await contract.retrieve();
  console.log("Favorite number:", favoriteNumber.toString());

  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log("Updated favorite number:", updatedFavoriteNumber.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
