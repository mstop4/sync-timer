const rewire = require('rewire');
const { sleep } = require('../../helpers/index.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

JSDOM.fromFile('./views/index.html')
  .then((dom) => {
    document = dom.window.document;
    window = dom.window;
    let timer = null;
    let resetTimer = null;
    
    describe.skip('Timer Controller (Client)', () => {
    
      before(() => {
        timer = rewire('../../public/js/timerController.js');
      });
    
      beforeEach(() => {
      });
    
      after(() => {
        window.close();
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
  });