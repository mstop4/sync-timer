'use strict';

const express = require('express');
const router = express.Router();

const routes = (rm) => {
  
  router.get('/', (req, res) => {
    res.redirect('/');
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
    res.status(200).send(stats);
  });

  return router;
}

module.exports = routes;