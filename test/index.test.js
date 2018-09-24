const { expect } = require("chai");

describe("Index Testing", () => {
  let page;

  before (async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:8080');
  });

  after (async () => {
    await page.close();
  })

  it('should have the correct page title', async () => {
    expect(await page.title()).to.eql('Sync Timer');
  });

  it('should only have one timer display', async () => {
    await page.waitFor('body');
    expect(await page.$$('#timer-display')).to.have.lengthOf(1);
  })

  it('should have a timer that reads 00:00:00', async () => {
    let display;

    await page.waitFor('#timer-display');
    display = await page.$eval('#timer-display', timer => timer.innerText);

    expect(display).to.eql('00:00:00');
  })
});