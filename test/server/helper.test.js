'use strict';

const { logExceptInTest, padDisplay } = require('../../helpers');

describe('Helper Library', () => {

  it('should not log anything in test environment', () => {
    const result = logExceptInTest('Hello World');
    expect(result).to.be.false;
  });

  it('should log something in any other environment except test', () => {
    process.env.NODE_ENV = 'test2';
    const result = logExceptInTest('Hello World');

    expect(result).to.be.true;
    process.env.NODE_ENV = 'test';
  });


  it('should pad a stringfied number to two digits', () => {
    const result = padDisplay('2', 2);
    expect(result).to.eql('02');
  });

  it('should not pad stringfied number with two digits already', () => {
    const result = padDisplay('12', 2);
    expect(result).to.have.length(2);
  });
});