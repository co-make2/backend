const request = require('supertest');

const server = require('../api/server.js');
const db = require('../data/dbConfig.js')


describe('categories router', function (){
    describe('GET /api/users', function () {
        it('should return 401 OK', function (){
            return request(server)
              .get('/api/categories')
              .then(res => {
                  console.log("res is here", res.error.message) 
                  expect(res.status).toBe(401)
              })
        })
    })








})