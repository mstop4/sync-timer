'use strict';

const express = require('express');
const router = express.Router();

module.exports = (passport) => {

  router.get('/', (req, res) => {
    res.render('adminLogin');
  });

  router.post('/', 
    passport.authenticate('local', { failureRedirect: '/admin/401' }),
    (req, res) => res.redirect('/admin/dashboard')
  );

  router.get('/dashboard', (req, res) => {
    res.render('adminDashboard');
  })

  router.get('/401', (req, res) => {
    res.status(401).render('admin401');
  });

  return router;
}