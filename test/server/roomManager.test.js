'use strict';

const RoomManager = require('../../models/roomManager');
let rm;

describe('Room Manager', () => {

  beforeEach(() => {
    rm = new RoomManager();
  });

  it('should create a new timer', () => {
    const id = rm.createTimer();

    expect(id).to.be.a('string');
    expect(rm.timerList[id]).to.not.be.undefined;
  });

  it('should remove a timer', () => {
    const id = rm.createTimer();
    const result = rm.deleteTimer(id);

    expect(result).to.be.true;
    expect(Object.keys(rm.timerList)).to.have.length(0);
  });

  it('should not remove a timer that does not exist', () => {
    let id = rm.createTimer();
    id = id.slice(1,id.length);
    const result = rm.deleteTimer(id);

    expect(result).to.be.false;
    expect(Object.keys(rm.timerList)).to.have.length(1);
  });
  
});