'use strict';

const RoomManager = require('../../models/RoomManager');
let rm;
const clientIdSeeds = ['test', 'foo', 'bar'];
const timerIdSeeds = ['fake'];

describe('Room Manager', () => {

  beforeEach(() => {
    rm = new RoomManager();
  });

  describe('Client existence', () => {
    it('should say client exists', () => {
      rm.addClient(clientIdSeeds[0]);
      expect(rm.clientExists(clientIdSeeds[0])).to.be.true;
    });
  
    it('should not say client exists', () => {
      rm.addClient(clientIdSeeds[0]);
      expect(rm.clientExists(clientIdSeeds[1])).to.be.false;
    });
  });

  describe('Timer existence', () => {
    it('should say timer exists', () => {
      const id = rm.createTimer();
      expect(rm.timerExists(id)).to.be.true;
    });
  
    it('should not say timer exists', () => {
      let id = rm.createTimer();
      rm.deleteTimer(id);
      expect(rm.timerExists(id)).to.be.false;
    }); 
  }); 

  describe('Creating and removing Timers', () => {
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

  describe('Creating and removing Clients', () => {
    it('should add a client', () => {
      const result = rm.addClient(clientIdSeeds[0]);
  
      expect(result).to.be.true;
      expect(rm.clientList).to.have.length(1);
    });
  
    it('should remove a client', () => {
      rm.addClient(clientIdSeeds[0]);
      const result = rm.removeClient(clientIdSeeds[0]);
  
      expect(result).to.be.true;
      expect(rm.clientList).to.have.length(0);
    });
  
    it('should not remove a client that does not exist', () => {
      rm.addClient(clientIdSeeds[0]);
      const result = rm.removeClient(clientIdSeeds[1]);
  
      expect(result).to.be.false;
      expect(rm.clientList).to.have.length(1);
    });
  });
  
  describe('Adding Clients to Timers', () => {
    it('should add a client to a timer', () => {
      rm.addClient(clientIdSeeds[0]);
      const timerId = rm.createTimer();
      const result = rm.addClientToTimer(timerId, clientIdSeeds[0]);
  
      expect(result).to.be.true;
      expect(rm.timerList[timerId].clients.includes(clientIdSeeds[0])).to.be.true;
    });
  
    it('should not add a client to a timer that does not exist', () => {
      rm.addClient(clientIdSeeds[0]);
      const timerId = timerIdSeeds[0];
      const result = rm.addClientToTimer(timerId, clientIdSeeds[0]);
  
      expect(result).to.be.false;
    });
  
    it('should not add a client that does not exist to a timer', () => {
      rm.addClient(clientIdSeeds[0]);
      const timerId = rm.createTimer();
      const result = rm.addClientToTimer(timerId, clientIdSeeds[1]);
  
      expect(result).to.be.false;
      expect(rm.timerList[timerId].clients.includes(clientIdSeeds[1])).to.be.false;
    });
  });

  describe('Removing Clients from Timers', () => {
    it('should remove a client from a timer', () => {
      rm.addClient(clientIdSeeds[0]);
      rm.addClient(clientIdSeeds[1]);
  
      const timerId = rm.createTimer();
      rm.addClientToTimer(timerId, clientIdSeeds[0]);
      rm.addClientToTimer(timerId, clientIdSeeds[1]);
      const result = rm.removeClientFromTimer(timerId, clientIdSeeds[0]);
  
      expect(result).to.be.true;
      expect(rm.timerList[timerId].clients.includes(clientIdSeeds[0])).to.be.false;
    });
  
    it('should activate timer GC if it has no clients', () => {
      rm.addClient(clientIdSeeds[0]);
      const timerId = rm.createTimer();
      rm.addClientToTimer(timerId, clientIdSeeds[0]);
      rm.removeClientFromTimer(timerId, clientIdSeeds[0]);
  
      expect(rm.timerGCList[timerId]).to.not.eql(undefined);
    });
  
    it('should not remove a client from a timer that does not exist', () => {
      rm.addClient(clientIdSeeds[0]);
      const timerId = rm.createTimer();
      rm.addClientToTimer(timerId, clientIdSeeds[0]);
      const badTimerId = timerIdSeeds[0];
      const result = rm.removeClientFromTimer(badTimerId, clientIdSeeds[0]);
  
      expect(result).to.be.false;
    });
  
    it('should not remove a client that does not exist from a timer', () => {
      rm.addClient(clientIdSeeds[0]);
      const timerId = rm.createTimer();
      rm.addClientToTimer(timerId, clientIdSeeds[0]);
      const result = rm.removeClientFromTimer(timerId, clientIdSeeds[1]);
  
      expect(result).to.be.false;
      expect(rm.timerList[timerId].clients.includes(clientIdSeeds[0])).to.be.true;
    });
  });

  describe('Removing Clients from Any Timer', () => {
    it('should remove a client from any timer', () => {
      rm.addClient(clientIdSeeds[0]);
      rm.addClient(clientIdSeeds[1]);

      const timerId = [];
      timerId[0] = rm.createTimer();
      timerId[1] = rm.createTimer();

      rm.addClientToTimer(timerId[1], clientIdSeeds[0]);
      rm.addClientToTimer(timerId[1], clientIdSeeds[1]);
      const result = rm.removeClientFromAnyTimer(clientIdSeeds[0]);
  
      expect(result).to.be.true;
      expect(rm.timerList[timerId[0]].clients.length).to.eql(0);
      expect(rm.timerList[timerId[1]].clients.length).to.eql(1);
    });
  
    it('should not remove a client that does not exist in any timer', () => {
      rm.addClient(clientIdSeeds[0]);
      rm.addClient(clientIdSeeds[1]);

      const timerId = [];
      timerId[0] = rm.createTimer();
      timerId[1] = rm.createTimer();

      rm.addClientToTimer(timerId[1], clientIdSeeds[0]);
      rm.addClientToTimer(timerId[1], clientIdSeeds[1]);
      const result = rm.removeClientFromAnyTimer(clientIdSeeds[2]);
  
      expect(result).to.be.false;
      expect(rm.timerList[timerId[0]].clients.length).to.eql(0);
      expect(rm.timerList[timerId[1]].clients.length).to.eql(2);
    });
  });
});