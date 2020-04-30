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
        await db('categories').truncate()
        await db('posts').truncate()
        await db('users').truncate()
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

    it('should return status 200 on GET to posts with auth', function (){
        
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

    

    it('should return status 200 on PUT to posts/:id', function (){

        const testPost = {
            user_id: id,
            title: "Big Day for Testing",
            text: "text is needed",
            zip: "00001" 
        }

        const newZip = {zip: "00007"}

        console.log("HERE IS THE TEST POST", testPost)

        return request(server)
          .post('/api/posts')
          .send(testPost)
          .set('authorization', token)
          .then(res => {
              return (stat= res.status)
             })
             .then(stat => {
                 console.log (stat, "@@@@@@@@@@@@@@")
              return request(server)
              .put('/api/posts/1')
              .send(newZip)
              .set('authorization', token)
              .then(res2 => {
                expect(res2.status).toBe(200)
              }) 
          })


    })

    it('should return a 201 on an authorized put to api/posts/:id/vote', function (){

        const testPost = {
            user_id: id,
            title: "Big Day for Testing",
            text: "text is needed",
            zip: "00001"
        }

        console.log("TEST", testPost)

        const newVote = {
            vote: 1
        }

        return request(server)
          .post('/api/posts')
          .send(testPost)
          .set('authorization', token)
          .then( res => {
              return request(server)
              .put('/api/posts/1/vote')
              .send(newVote)
              .set('authorization', token)
              .then(res2 => {
                console.log("VOTE OR DIE", res2.status, res2.body)
                expect(res2.status).toBe(201)
              })
          })

    })

})
