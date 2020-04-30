const request = require('supertest');

const server = require('../api/server.js');
const db = require('../data/dbConfig.js')


describe('categories router', function (){
    describe('FAILED GET /api/users without Auth', function () {
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

    beforeAll(async () => {
        await db('categories').truncate()
        await db('posts').truncate()
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

    it('should return status 200 on GET to categories with auth', function (){
        return request(server)
        .get('/api/categories')
        .set('authorization', token)
        .then(res => {
            // console.log("res is here", res.body) 
            expect(res.status).toBe(200)
        })
    })

    const testCat = {
        category: "Testing - haha"
    }

    it('should return status 201 on POST to categories', function (){
        return request(server)
        .post('/api/categories')
        .send(testCat)
        .set('authorization', token)
        .then(res => {
            // console.log("***POST STATUS***",res.status) 
            expect(res.status).toBe(201)
        })
    })

    const newCat = {category: "Update Test"}

    describe("PUT /api/categories", function (){
      it('should return 200 OK', function (){
        return request(server)
        .post('/api/categories')
        .send(testCat)
        .set('authorization', token)
        .then(res => {
            return request(server)
            .put('/api/categories/1')
            .send(newCat)
            .set('authorization', token)
            .then(res2 => {
            expect(res2.status).toBe(200)
            })
        }) 
      })
    })


    describe("DELETE /api/categories/1", function (){
      it('should return 200 OK', function (){
        return request(server)
        .post('/api/categories')
        .send(testCat)
        .set('authorization', token)
        .then(res => {
            return request(server)
            .delete('/api/categories/1')
            .set('authorization', token)
            .then(res2 => {
                expect(res2.status).toBe(200) 
            })
        })
      })
    })

})