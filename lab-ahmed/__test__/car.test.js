'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Car Routes', () => {
  let car = null;

  describe('POST: /api/car', function() {
    it('should create and return a car,', function(done) {
      request.post('localhost:3000/api/car')
        .send({ name: 'test name', content: 'test content' })
        .end((err, res) => {
          if (err) return done(err);
          car = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(car.name).toEqual('test name');
          expect(car.content).toEqual('test content');
          done();
        });
    });
    it('should respond with bad request if no req body or if req body is invalid', function(done) {
      request.post('localhost:3000/api/car')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('GET: /api/car/:carId', function() {
    it('should GET and return a car,', function(done) {
      request.get(`localhost:3000/api/car/${car.id}`)
        .end((err, res) => {
          if (err) return done(err);
          car = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(car.name).toEqual('test name');
          expect(car.content).toEqual('test content');
          done();
        });
    });
    it('should respond with not found for valid requests made with an id that was not found', function(done) {
      request.get('localhost:3000/api/car/hey')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should respond with bad request if no id was provided in the request', function(done) {
      request.get('localhost:3000/api/car/:id')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });
});