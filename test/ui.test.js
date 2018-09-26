require('dotenv').config();

describe("UI Testing", () => {
  let page;

  before (async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${process.env.PORT}`);
  });

  after (async () => {
    await page.close();
  });

  it('should have the correct page title', async () => {
    expect(await page.title()).to.eql('Sync Timer');
  });

  it('should only have one timer display', async () => {
    await page.waitFor('body');
    expect(await page.$$('#timer-display')).to.have.lengthOf(1);
  });

  it('should have a timer that reads 00:00:00', async () => {
    let seconds;
    let minutes;
    let hours;

    await page.waitFor('#timer-display');
    seconds = await page.$eval('#seconds-display', sec => sec.innerText);
    minutes = await page.$eval('#minutes-display', min => min.innerText);
    hours = await page.$eval('#hours-display', hr => hr.innerText);

    expect(seconds).to.eql('00');
    expect(minutes).to.eql('00');
    expect(hours).to.eql('00');
  });

  it('should have a Start button', async () => {
    let startButton;

    await page.waitFor('#start-button');
    startButton = await page.$eval('#start-button', button => button.innerText);

    expect(startButton).to.eql('Start');
  });

  it('should have a Stop button', async () => {
    let stopButton;

    await page.waitFor('#stop-button');
    stopButton = await page.$eval('#start-button', button => button.innerText);

    expect(stopButton).to.eql('Start');
  });  
});