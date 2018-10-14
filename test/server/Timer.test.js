'use strict';

const Timer = require('../../models/Timer');
const { sleep } = require('../../helpers');
const TIMERSTATE = require('../../helpers/timerStates');
let timer = null;

const clientId = ['test', 'foo'];

describe('Timer', () => {

  beforeEach(() => {
    timer = new Timer(null);
  });

  it('should have the timer start at initial state', () =>{
    expect(timer.hours).to.eql(0);
    expect(timer.minutes).to.eql(0);
    expect(timer.seconds).to.eql(0);
    expect(timer.timerRunning).to.eql(TIMERSTATE.STOPPED);
  });

  it('should reset the timer', () => {
    timer.hours = 12;
    timer.resetTimer();

    expect(timer.hours).to.eql(0);
  });

  it('should start the timer', () => {
    timer.startTimer();

    expect(timer.timerRunning).to.eql(TIMERSTATE.RUNNING);
    expect(timer.timerLoop).to.not.be.null;
  });

  it('should stop the timer', (done) => {
    timer.startTimer();

    (async () => {
      await sleep(1000);
      timer.stopTimer();

      expect(timer.timerRunning).to.eql(TIMERSTATE.SUSPENDED);
      expect(timer.timerLoop._repeat).to.be.null;
      done();
    })();
  });

  it('should update the timer', async () => {
    const secondsThen = timer.seconds;
    await sleep(2000);
    timer.updateTimer();
    const secondsNow = timer.seconds;

    expect(secondsNow).to.be.above(secondsThen);
  });

  it('should add a client', () => {
    const result = timer.addClient(clientId[0]);
    expect(result).to.be.true;
    expect(timer.clients).to.have.members([clientId[0]]);
  });

  it('should not add a client if it is already added to a timer', () => {
    timer.addClient(clientId[0]);
    timer.addClient(clientId[1]);
    const result = timer.addClient(clientId[0]);
    expect(result).to.be.false;
    expect(timer.clients).to.have.length(2);
  });

  it('should remove a client', () => {
    timer.addClient(clientId[0]);
    timer.addClient(clientId[1]);
    const result = timer.removeClient(clientId[0]);
    expect(result).to.be.true;
    expect(timer.clients).to.not.have.members([clientId[0]]);
  });

  it('should not remove a client if it was not added to timer', () => {
    timer.addClient(clientId[0]);
    const result = timer.removeClient(clientId[1]);
    expect(result).to.be.false;
    expect(timer.clients).to.have.length(1);
  });
});