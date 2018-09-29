const fs = require('fs');   
const rewire = require('rewire');
const { sleep } = require('../../helpers/index.js');

let jsdom = null;
let timer = null;
let resetTimer = null;

describe('Timer Controller (Client)', () => {

  before(() => {
    let htmlContent = fs.readFileSync('./views/index.html','utf-8');
    jsdom = require('jsdom-global')(htmlContent);
    timer = rewire('../../public/js/timerController.js');
    resetTimer = timer.__get__('resetTimer');
  });

  beforeEach(() => {
    resetTimer();
  });

  after(() => {
    jsdom();
  });

  xit('should start the timer', () => {
    const startTimer = timer.__get__('startTimer');
    startTimer();

    const timerRunning = timer.__get__('timerRunning');
    const timerLoop = timer.__get__('timerLoop');
    expect(timerRunning).to.be.true;
    expect(timerLoop).to.not.be.null;
  });

  xit('should stop the timer', (done) => {
    const startTimer = timer.__get__('startTimer');
    const stopTimer = timer.__get__('stopTimer');

    startTimer();

    (async () => {
      await sleep(1000);
      stopTimer();
      
      const timerRunning = timer.__get__('timerRunning');
      const timerLoop = timer.__get__('timerLoop');
      expect(timerRunning).to.be.false;
      expect(timerLoop).to.be.null;
      done();
    })();
  });

  xit('should reset the timer', () => {
    timer.__set__('hours', 12);
    resetTimer();

    const hours = timer.__get__('hours');
    expect(hours).to.eql(0);
  });
});