const { logExceptInTest, padDisplay } = require('../../helpers');
const sinon = require('sinon');

describe('Helper Library', () => {

  it('should not log anything in test environment', () => {
    this.sinon = sinon.createSandbox();
    this.sinon.stub(console, 'log');
    logExceptInTest('Hello World');

    expect(console.log.notCalled).to.be.true;
  });

  it('should pad a stringfied number to two digits', () => {
    const result = padDisplay('2', 2);
    expect(result).to.eql('02');
  });

  it('should not pad stringfied number with two digits already', () => {
    const result = padDisplay('12', 2);
    expect(result.length).to.eql(2);
  });
});