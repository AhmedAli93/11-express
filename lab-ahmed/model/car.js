'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('car:car');
const storage = require('../lib/storage.js');

const Car = module.exports = function(name, content) {
  debug('Car constructor');

  if (!name) throw new createError(400, 'expected name');
  if (!content) throw new createError(400, 'expected content');

  this.id = uuidv4();
  this.name = name;
  this.content = content;
};

Car.createCar = function(_car) {
  debug('createCar');

  try {
    let car = new Car(_car.name, _car.content);
    return storage.createItem('car', car);
  } catch (err) {
    return Promise.reject(err);
  }
};

Car.fetchCar = function(id) {
  debug('fetchCar');
  return storage.fetchItem('car', id);
};