const fs = require('fs');   
const rewire = require('rewire');
const { sleep } = require('./utils.js');

let jsdom = null;
let timer = null;
let resetTimer = null;

describe('Timer Functionality', () => {

  before(() => {
    let htmlContent = fs.readFileSync("./src/index.html","utf-8");
    jsdom = require('jsdom-global')(htmlContent);
    timer = rewire('../src/js/timer.js');
    resetTimer = timer.__get__('resetTimer');
  });

  beforeEach(() => {
    resetTimer();
  })

  after(() => {
    jsdom();
  })

  it('should have the timer start at 00:00:00', () => {
    const seconds = timer.__get__('seconds');
    const minutes = timer.__get__('minutes');
    const hours = timer.__get__('hours');

    expect(seconds).to.eql(0);
    expect(minutes).to.eql(0);
    expect(hours).to.eql(0);
  });

  it('should start the timer', () => {
    const startTimer = timer.__get__('startTimer');
    startTimer();

    const timerRunning = timer.__get__('timerRunning');
    expect(timerRunning).to.eql(true);
  });

  it('should stop the timer', (done) => {
    const startTimer = timer.__get__('startTimer');
    const stopTimer = timer.__get__('stopTimer');

    startTimer();

    (async () => {
        await sleep(1000);
        stopTimer();
        const timerRunning = timer.__get__('timerRunning');
        expect(timerRunning).to.eql(false);
        done();
    })();
  });

  it('should pad a stringfied number to two digits', () => {
    const padDisplay = timer.__get__('padDisplay');
    expect(padDisplay('2', 2)).to.eql('02');
  });

  it('should not pad stringfied number with two digits already', () => {
    const padDisplay = timer.__get__('padDisplay');
    expect(padDisplay('12', 2).length).to.eql(2);
  });

});