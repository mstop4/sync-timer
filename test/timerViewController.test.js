const { expect } = require('chai');
const rewire = require('rewire');
const { sleep } = require('./utils.js');

const timerVC = rewire('../src/js/timerViewController.js');
const timerMC = {
  hours: 0,
  minuntes: 0,
  seconds: 0
}