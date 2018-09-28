require('dotenv').config();
const puppeteer = require('puppeteer');
const { expect } = require('chai');
const app = require('../../bin/server');
const port = process.env.PORT_TEST || 3001;

const oldGlobalVars = {
  browser: global.browser,
  expect: global.expect,
};

// Puppeteer Options
const options = {
  headless: true,
  slowMo: 100,
  timeout: 10000,
  args: ['--no-sandbox']
};

// Expose vars
before (async function () {
  global.expect = expect;
  global.browser = await puppeteer.launch(options);
  global.testServer = app(port);
});

// Close browser and reset globals
after(function() {
  browser.close();
  testServer.close(() => {
    console.log('Mocha: Test Server shut down.');
  });

  global.browser = oldGlobalVars.browser;
  global.expect = oldGlobalVars.expect;
});