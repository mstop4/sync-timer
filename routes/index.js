'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile('index.html');
});

// router.get('/stats', (req, res) => {
//   res.send()
// });

module.exports = router;