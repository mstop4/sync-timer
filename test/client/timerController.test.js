/*'use strict';

const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const timerController = fs.readFileSync('./public/js/timerController.js', { encoding: 'utf-8' });

JSDOM.fromFile('./views/timer.html', { runScripts: 'dangerously' })
  .then((dom) => {
    const document = dom.window.document;
    const window = dom.window;
    const scriptEl = document.createElement('script');
    scriptEl.textContent = timerController;
    document.body.appendChild(scriptEl);

    // Stub
    window.initTime = window.updateDisplay.bind(null, '00', '00', '00');
    
    describe('Timer Controller (Client)', () => {
      after(() => {
        window.close();
      });
    
      it('should update the display', () => {
        window.updateDisplay('12', '30', '45');
        const hours = document.getElementById('hours-display').innerText;
        const minutes = document.getElementById('minutes-display').innerText;
        const seconds = document.getElementById('seconds-display').innerText;

        expect(hours).to.eql('12');
        expect(minutes).to.eql('30');
        expect(seconds).to.eql('45');
      });
    }); 
  });*/