const { expect } = require("chai");
const rewire = require('rewire');

const timer = rewire('../src/js/timer.js');
const helloWorld = timer.__get__('helloWorld');

describe("Timer Functionality Testing", () => {
  it('helloWorld should return "Hello World"', () => {
    expect(helloWorld()).to.eql("Hello World");
  });
});