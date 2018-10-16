'use strict';

const express = require('express');
const router = express.Router();
  
router.get('/', (req, res) => {
  res.render('adminLogin');
});

router.get('/dashboard', (req, res) => {
  res.render('adminDashboard');
})

router.get('/401', (req, res) => {
  res.status(401).render('admin401');
});

module.exports = router;