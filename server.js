require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => console.log(`🕒  Sync Timer listening on port ${port}`));