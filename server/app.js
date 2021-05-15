const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const router = require('./api');

require('dotenv').config();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
