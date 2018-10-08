'use strict';

const RoomManager = require('../../models/RoomManager');
let rm;
const clientId = ['test', 'foo'];

describe('Room Manager', () => {

  beforeEach(() => {
    rm = new RoomManager();
  });

  it('should say client exists', () => {
    rm.addClient(clientId[0]);
    expect(rm.clientExists(clientId[0])).to.be.true;
  });

  it('should not say client exists', () => {
    rm.addClient(clientId[0]);
    expect(rm.clientExists(clientId[1])).to.be.false;
  });

  it('should say timer exists', () => {
    const id = rm.createTimer();
    expect(rm.timerExists(id)).to.be.true;
  });

  it('should not say timer exists', () => {
    let id = rm.createTimer();
    rm.deleteTimer(id);
    expect(rm.timerExists(id)).to.be.false;
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

  it('should add a client', () => {
    const result = rm.addClient(clientId[0]);

    expect(result).to.be.true;
    expect(rm.clientList).to.have.length(1);
  });

  it('should remove a client', () => {
    rm.addClient(clientId[0]);
    const result = rm.removeClient(clientId[0]);

    expect(result).to.be.true;
    expect(rm.clientList).to.have.length(0);
  });

  it('should not remove a client that does not exist', () => {
    rm.addClient(clientId[0]);
    const result = rm.removeClient(clientId[1]);

    expect(result).to.be.false;
    expect(rm.clientList).to.have.length(1);
  });
  
  it('should add a client to a timer', () => {
    rm.addClient(clientId[0]);
    const timerId = rm.createTimer();
    const result = rm.addClientToTimer(timerId, clientId[0]);

    expect(result).to.be.true;
    expect(rm.timerList[timerId].clients.includes(clientId[0])).to.be.true;
  });

  it('should not add a client to a timer that does not exist', () => {
    rm.addClient(clientId[0]);
    const result = rm.addClientToTimer('fake', clientId);

    expect(result).to.be.false;
  });
});