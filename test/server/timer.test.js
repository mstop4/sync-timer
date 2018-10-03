'use strict';

const Timer = require('../../models/timer');
const { sleep } = require('../../helpers/index');
let timer = null;

describe('Timer (Server)', () => {

  beforeEach(() => {
    timer = new Timer();
  });

  it('should have the timer start at 00:00:00', () =>{
    expect(timer.hours).to.eql(0);
    expect(timer.minutes).to.eql(0);
    expect(timer.seconds).to.eql(0);
  });

  it('should reset the timer', () => {
    timer.hours = 12;
    timer.resetTimer();

    expect(timer.hours).to.eql(0);
  });

  it('should start the timer', () => {
    timer.startTimer();

    expect(timer.timerRunning).to.be.true;
    expect(timer.timerLoop).to.not.be.null;
  });

  it('should stop the timer', (done) => {
    timer.startTimer();

    (async () => {
      await sleep(1000);
      timer.stopTimer();

      expect(timer.timerRunning).to.be.false;
      expect(timer.timerLoop._repeat).to.be.null;
      done();
    })();
  });

  it('should add a client', () => {
    const result = timer.addClient('test');
    expect(result).to.be.true;
    expect(timer.clients).to.have.members(['test']);
  });

  it('should not add a client if it is already added to a timer', () => {
    timer.addClient('test');
    timer.addClient('foo');
    const result = timer.addClient('test');
    expect(result).to.be.false;
    expect(timer.clients.length).to.eql(2);
  });

  it('should remove a client', () => {
    timer.addClient('test');
    timer.addClient('foo');
    const result = timer.removeClient('test');
    expect(result).to.be.true;
    expect(timer.clients).to.not.have.members(['test']);
  });

  it('should not remove a client if it was not added to timer', () => {
    timer.addClient('test');
    const result = timer.removeClient('foo');
    expect(result).to.be.false;
    expect(timer.clients.length).to.eql(1);
  });
});