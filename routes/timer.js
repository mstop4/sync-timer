'use strict';

const express = require('express');
const router = express.Router();

const routes = (rm) => {

  router.get('/', (req, res) => {
    res.redirect('/');
  });

  router.post('/', (req, res) => {
    res.redirect(`/timer/${req.body.timerId}`);
  });

  router.get('/new', (req, res) => {
    const timerId = rm.createTimer();
    res.redirect(`/timer/${timerId}`);
  });

  router.get('/404', (req, res) => {
    res.status(404).render('timer404');
  });

  router.get('/:id', (req, res) => {
    const validId = req.params.id.toLowerCase();
    if (rm.timerExists(validId)) {
      res.status(200).render('timer', { timerId: validId });
    } else {
      res.redirect('/timer/404');
    }
  });

  return router;
}

module.exports = routes;