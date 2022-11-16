import { expect } from "chai";
import hre from "hardhat";

import type { SimpleStorage, SimpleStorage__factory } from "./typechain-types";

describe("SimpleStorage", () => {
  let simpleStorageFactory: SimpleStorage__factory;
  let simpleStorage: SimpleStorage;

  beforeEach(async () => {
    simpleStorageFactory =
      await ethers.getContractFactory<SimpleStorage__factory>("SimpleStorage");
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
