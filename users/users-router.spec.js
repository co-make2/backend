const request = require('supertest');

const server = require('../api/server.js');
const db = require('../data/dbConfig.js');

describe('users router', function (){
    describe('GET /api/users', function () {
        it('should return 200 OK', function (){
            return request(server)
              .get('/api/users')
              .then(res => {
                //   console.log("res is here", res.body[0].id)
                  expect(res.status).toBe(200)
              })
        })
    })

    const testUser = {
        username: "testuser",
        email: "test@email.com",
        password: "testpassword",
        zip: "00000"
    }

    describe('POST /api/users/register', function () {
        beforeEach(async () => {
            await db('users').truncate() 
        })
        
        it("returns 201 successful registration", function (){
            return request(server)
              .post('/api/users/register')
              .send(testUser)
              .then(res => [
                  expect(res.status).toBe(201)
              ])
        })
    })

    const testLogin = {
        username: "testuser",
        password: 'testpassword' 
    }

    describe('POST /api/users/login', function () {

        it('returns 200 successful login', function (){
            return request(server)
              .post('/api/users/login')
              .send(testLogin)
              .then(res => {
                  expect(res.status).toBe(200)
              })
        })
    })

    const newZip = {zip: "00007"}

    describe("PUT /api/users - first need to set userid in req", function () {
        it('should return 200 OK', function (){
            return request(server)
              .post('/api/users/login')
              .send(testLogin)
              .then(res => {
                return request(server)
              .get('/api/users')
              .then(res2 => {
                 return (user = res2.body[0].id)
              })
              .then(user => {
                  return request(server)
                    .put(`/api/users/${user}`)
                    .send(newZip)
                    .then(res3 => {
                        expect(res3.status).toBe(201)
                    })
              })
              })
              
        })
    })

    describe('DELETE /api/users - first need to set userid in req', function () {
        it('should return 200 OK', function () {
            return request(server)
              .get('/api/users')
                .then(res => {
                    return (user = res.body[0].id)
                })
                .then(user => {
                    return request(server)
                    .delete(`/api/users/${user}`)
                    .then(res2 => {
                        expect(res2.status).toBe(200)
                    })
                })
        })
    })


})