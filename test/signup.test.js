const request = require("supertest");
 

const baseUrl = "localhost:80";

describe("singup endpoint",()=>{
    it('Should return 201 Status Code',async()=>{
        const response = await request(baseUrl)
        .post('/signup')
        .set("Content-Type","application/json")
        .send({
                "username":"rahul567",
                "password":"Testabcd",
                "first_name":"rahul",
                "last_name":"bansiwal",
                "email":"test123@test.com"});

        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject({
            "message":"User Created succesfully",
            "username":"rahul567"})}),
        it('Should return 400 Status Code',async()=>{
                const response = await request(baseUrl)
                .post('/signup')
                .set("Content-Type","application/json")
                .send({
                        "username":"rahul567",
                        "password":"estabcd",
                        "first_name":"rahul",
                        "last_name":"bansiwal",
                        "email":"test123@test.com"});
        
                expect(response.statusCode).toBe(400);
                expect(response.body).toMatchObject({
                    "type":"password doesn't meet the requirment"    
                })
                })
})