'use strict';

require('dotenv').config();
const port = process.env.PORT_TEST || 3001;
const { sleep } = require('../../helpers/index.js');

describe.skip('UI Testing', () => {
  let page;

  before (async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${port}/timer`);
  });

  after (async () => {
    await page.close();
  });

  it('should have the correct page title', async () => {
    expect(await page.title()).to.eql('Sync Timer');
  });

  it('should only have one timer display', async () => {
    await page.waitFor('body');
    expect(await page.$$('#timer-display')).to.have.length(1);
  });

  it('should have a timer that reads 00:00:00', async () => {
    await page.waitFor('#timer-display');
    let seconds = await page.$eval('#seconds-display', sec => sec.innerText);
    let minutes = await page.$eval('#minutes-display', min => min.innerText);
    let hours = await page.$eval('#hours-display', hr => hr.innerText);

    expect(seconds).to.eql('00');
    expect(minutes).to.eql('00');
    expect(hours).to.eql('00');
  });

  it('should have a Start button', async () => {
    await page.waitFor('#start-button');
    let startButton = await page.$eval('#start-button', button => button.innerText);

    expect(startButton).to.eql('Start');
  });

  it('should have a Stop button', async () => {
    await page.waitFor('#stop-button');
    let stopButton = await page.$eval('#start-button', button => button.innerText);

    expect(stopButton).to.eql('Start');
  });

  it('should start the timer', async () => {
    await Promise.all([
      page.waitFor('#start-button'),
      page.waitFor('#stop-button'),
      page.click('#start-button'),
      sleep(2000)
    ]);

    let secondsText = await page.$eval('#seconds-display', sec => sec.innerText);

    await page.click('#stop-button');

    expect(secondsText).to.not.eql('00');
  });

  it('should stop the timer', async () => {
    await Promise.all([
      page.waitFor('#start-button'),
      page.waitFor('#stop-button'),
      page.click('#start-button'),
      sleep(1500)
    ]);

    let earlyText = await page.$eval('#seconds-display', sec => sec.innerText);

    await Promise.all([
      page.click('#stop-button'),
      sleep(2000)
    ]);

    let lateText = await page.$eval('#seconds-display', sec => sec.innerText);

    expect(lateText).to.eql(earlyText);
  });
});