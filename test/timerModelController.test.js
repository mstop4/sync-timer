const { expect } = require('chai');
const rewire = require('rewire');
const { sleep } = require('./utils.js');

const timerMC = rewire('../src/js/timerModelController.js');
const resetTimer = timerMC.__get__('resetTimer');

describe("Timer Model Functionality", () => {

  before( () => {
    resetTimer();
  })
  it('should have the timer start at 00:00:00', () => {
    const seconds = timerMC.__get__('seconds');
    const minutes = timerMC.__get__('minutes');
    const hours = timerMC.__get__('hours');

    expect(seconds).to.eql(0);
    expect(minutes).to.eql(0);
    expect(hours).to.eql(0);
  });

  it('should start the timer', () => {
    const startTimer = timerMC.__get__('startTimer');
    startTimer();

    const timerRunning = timerMC.__get__('timerRunning');
    expect(timerRunning).to.eql(true);
  });

  it('should stop the timer', (done) => {
    const startTimer = timerMC.__get__('startTimer');
    const stopTimer = timerMC.__get__('stopTimer');

    startTimer();

    (async () => {
        await sleep(1000);
        stopTimer();
        const timerRunning = timerMC.__get__('timerRunning');
        expect(timerRunning).to.eql(false);
        done();
    })();
  });
});