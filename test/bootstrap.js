const puppeteer = require('puppeteer');
const { expect } = require('chai');
const oldGlobalVars = {
  browser: global.browser,
  expect: global.expect
};

// Puppeteer Options
const options = {
  headless: true,
  slowMo: 100,
  timeout: 10000
};

// Expose vars
before (async function () {
  global.expect = expect;
  global.browser = await puppeteer.launch(options);
});

// Close browser and reset globals
after(function() {
  browser.close();

  global.browser = oldGlobalVars.browser;
  global.expect = oldGlobalVars.expect;
});