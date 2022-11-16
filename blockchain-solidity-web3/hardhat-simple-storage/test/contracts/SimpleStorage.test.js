const { expect } = require("chai");
const hre = require("hardhat");

describe("SimpleStorage", () => {
  let simpleStorageFactory;
  let simpleStorge;

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("starts with a `favoriteNumber` of 0", async () => {
    const favoriteNumber = await simpleStorage.retrieve();

    expect(favoriteNumber.toString()).to.equal("0");
  });

  it("updates when `store()` is called", async () => {
    const expectedFavoriteNumber = "7";
    const transactionResponse = await simpleStorage.store(
      expectedFavoriteNumber
    );
    await transactionResponse.wait(1);

    const favoriteNumber = await simpleStorage.retrieve();
    expect(favoriteNumber).to.equal(expectedFavoriteNumber);
  });
});
