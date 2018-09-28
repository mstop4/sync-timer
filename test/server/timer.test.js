const Timer = require('../../models/timer');
const { sleep } = require('../../helpers/index');
let timer = null;

describe('Timer Functionality (Server)', () => {

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

    expect(timer.timerRunning).to.eql(true);
    expect(timer.timerLoop).to.not.eql(null);
  });

  it('should stop the timer', (done) => {
    timer.startTimer();

    (async () => {
      await sleep(1000);
      timer.stopTimer();
      
      expect(timer.timerRunning).to.eql(false);
      expect(timer.timerLoop).to.eql(null);
      done();
    })();
  });

  it('should pad a stringfied number to two digits', () => {
    const result = timer.padDisplay('2', 2);
    expect(result).to.eql('02');
  });

  it('should not pad stringfied number with two digits already', () => {
    const result = timer.padDisplay('12', 2);
    expect(result.length).to.eql(2);
  });
});