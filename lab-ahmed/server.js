'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('car:server');
const Car = require('./model/car.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({ msg: 'hello from /test' });
});

app.post('/api/car', jsonParser, function(req, res, next) {
  debug('POST: /api/car');
  Car.createCar(req.body)
    .then( car => res.json(car))
    .catch( err => next(err));
});

app.get('/api/car/:carId', function(req, res, next) {
  debug('GET: /api/car/:carId');

  Car.fetchCar(req.params.carId)
    .then( car => res.json(car))
    .catch( err => next(err));
});

app.use(function(err, req, res) {
  debug('error middleware');
  console.error(err.message);

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});