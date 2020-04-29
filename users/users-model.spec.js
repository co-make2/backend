const request = require('supertest');

const server = require('../api/server.js')
const db = require('../data/dbConfig.js');

describe('users router', function (){
    describe('GET /', function () {
        it('should return 200 OK', function (){
            return request(server)
              .get('/api/users')
              .then(res => {
                  expect(res.status).toBe(200)
              })
        })
    })


    



})