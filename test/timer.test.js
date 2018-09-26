const { expect } = require("chai");
const rewire = require('rewire');
const { sleep } = require('./utils.js');

const timer = rewire('../src/js/timer.js');

describe("Timer Functionality Testing", () => {
  it('should return "Hello World"', () => {
    const helloWorld = timer.__get__('helloWorld');
    expect(helloWorld()).to.eql("Hello World");
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