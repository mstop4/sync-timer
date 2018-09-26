const { expect } = require('chai');
const rewire = require('rewire');
const fs = require('fs');    

let jsdom;
let timerVC = null;

describe('Timer View Functionality', () => {

  before(() => {
    let htmlContent = fs.readFileSync("./src/index.html","utf-8");
    jsdom = require('jsdom-global')(htmlContent);
    timerVC = rewire('../src/js/timerViewController.js');
  });

  after(() => {
    jsdom();
  })

  it('should pad a stringfied number to two digits', () => {
    const padDisplay = timerVC.__get__('padDisplay');
    expect(padDisplay('2', 2)).to.eql('02');
  });

  it('should not pad stringfied number with two digits already', () => {
    const padDisplay = timerVC.__get__('padDisplay');
    expect(padDisplay('12', 2).length).to.eql(2);
  });

});