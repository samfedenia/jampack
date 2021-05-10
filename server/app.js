const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const router = require('./api');

require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', router);

module.exports = app;
