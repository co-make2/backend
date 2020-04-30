const request = require('supertest');

const server = require('../api/server.js');
const db = require('../data/dbConfig.js')


describe('categories router', function (){
    describe('GET /api/users', function () {
        it('should return 401 as there is no web token', function (){
            return request(server)
              .get('/api/categories')
              .then(res => {
                //   console.log("res is here", res.error.message) 
                  expect(res.status).toBe(401)
              })
        })
    })

    let token

    const testUser = {
        username: "testuser",
        email: "test@email.com",
        password: "testpassword",
        zip: "00000"
    }

    const testCat = {
        category: "Testing - haha"
    }

    beforeEach(async () => {
        await db('users').truncate()
    })

    beforeEach(async () => {
        await request(server)
        .post('/api/users/register')
        .send(testUser)
        .then(res => {
            // console.log("****",res.body.token)
            return token = res.body.token
        })
    })

    it('should return status 200', function (){
        return request(server)
        .get('/api/categories')
        .set('authorization', token)
        .then(res => {
            // console.log("res is here", res.body) 
            expect(res.status).toBe(200)
        })
    })







})