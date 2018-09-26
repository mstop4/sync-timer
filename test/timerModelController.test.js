const { expect } = require('chai');
const rewire = require('rewire');
const { sleep } = require('./utils.js');

const timer = rewire('../src/js/timerModelController.js');
const resetTimer = timer.__get__('resetTimer');

describe("Timer Functionality Testing", () => {

  before( () => {
    resetTimer();
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
});