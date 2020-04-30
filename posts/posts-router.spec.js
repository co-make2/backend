const request = require('supertest');

const server = require('../api/server.js');
const db = require('../data/dbConfig.js')


describe('posts router', function (){
    describe('GET /api/posts without auth', function (){
        it('should return 401 as there is no web token', function (){
            return request(server)
              .get('/api/posts')
              .then(res => [
                expect(res.status).toBe(401)
              ])
        })
    })

    let token 
    let id

    const testUser = {
        username: "testuser",
        email: "test@email.com",
        password: "testpassword",
        zip: "00000"
    }

    beforeEach(async () => {
        await db('users').truncate()
        await db('posts').truncate()
    })

    beforeEach(async () => {
        await request(server)
        .post('/api/users/register')
        .send(testUser)
        .then(res => {
            // console.log("FINDING ID")
            token = res.body.token 
            id = res.body.userData.id
            return  id && token
        })
    })

    it('should return status 200 on GET to categories with auth', function (){
        
        return request(server)
        .get('/api/posts')
        .set('authorization', token)
        .then(res => {
            // console.log("res is here", res.body) 
            expect(res.status).toBe(200)
        })
    })


    it('should return status 201 on POST to categories', function (){

        const testPost = {
            user_id: id,
            title: "Big Day for Testing",
            text: "text is needed",
            zip: "00001"
        }
        
        // console.log("TestPost***", testPost)
        return request(server)
          .post('/api/posts')
          .send(testPost)
          .set('authorization', token)
          .then(res => {
            expect(res.status).toBe(201)
          })
    })

    const newZip = {zip: "00007"}

    it('should return status 201 on PUT to categories', function (){

        const testPost = {
            user_id: id,
            title: "Big Day for Testing",
            text: "text is needed",
            zip: "00001"
        }

        return request(server)
          .post('/api/posts')
          .send(testPost)
          .set('authorization', token)
          .then(res => {
              return request(server)
              .put('/api/posts/1')
              .send(newZip)
              .set('authorization', token)
              .then(res2 => {
                expect(res.status).toBe(200)
              })
          })


    })

})
