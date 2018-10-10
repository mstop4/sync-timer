'use strict';

const express = require('express');
const router = express.Router();

const routes = (rm) => {

  router.get('/', (req, res) => {
    res.redirect('/');
  });

  router.get('/new', (req, res) => {
    const timerId = rm.createTimer();
    res.redirect(`/timer/${timerId}`);
  });

  router.get('/404', (req, res) => {
    res.status(404).render('timer404');
  });

  router.get('/:id', (req, res) => {
    if (rm.timerExists(req.params.id)) {
      res.status(200).render('timer', { timerId: req.params.id });
    } else {
      res.redirect('/timer/404');
    }
  });

  return router;
}

module.exports = routes;