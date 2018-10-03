'use strict';

const express = require('express');
const router = express.Router();

const routes = (rm) => {
  
  /* GET home page. */
  router.get('/', (req, res) => {
    res.sendFile('index.html');
  });

  router.get('/stats', (req, res) => {
    // Sanitize timer objects to remove circular JSON reference
    const sanitizedTimers = Object.assign({}, rm.timerList);

    for (let timerId in sanitizedTimers) {
       delete sanitizedTimers[timerId].timerLoop;
    }

    const stats = {
      clients: rm.clientList,
      timers: sanitizedTimers,
    }
    res.send(stats);
  });

  return router;
}

module.exports = routes;