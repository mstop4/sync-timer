'use strict';

const express = require('express');
const router = express.Router();

const routes = (rm) => {
  
  /* GET home page. */
  router.get('/', (req, res) => {
    res.sendFile('index.html');
  });

  router.get('/stats', (req, res) => {
    const stats = {
      clients: rm.clientList,
      timers: rm.timerList,
      timerClients: rm.timerClientsList
    }
    res.send(stats);
  });

  return router;
}

module.exports = routes;