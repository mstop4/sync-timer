const { expect } = require("chai");

describe("Index Testing", () => {
  it("should run", async () => {
    console.log(await browser.version());
    expect(true).to.be.true;
  });
});