const app = require('../../app');
const should = require('should');
const request = require('supertest')(app);


describe('home controller', () => {

    it('GET "/" return status 200', (done) =>{
        request.get('/').end((err, res) => {
            res.status.should.eql(200);
            done();
        });
    });

    it('GET "/logout" redirect to GET "/"', (done) =>{
        request.get('/logout').end((err, res) => {
            res.headers.location.should.eql('/');
            done();
        });
    });

    it('POST "/login" valid redirect to GET "/contacts"', (done) =>{
        const user = {name: 'test', email: 'test@test.com'};
        request.post('/login').send({user}).end((err, res) => {
            res.headers.location.should.eql('/contacts');
            done();
        });
    });

    it('POST "/login" invalid redirect to GET "/"', (done) =>{
        const user = {name: '', email: ''};
        request.post('/login').send({user}).end((err, res) => {
            res.headers.location.should.eql('/');
            done();
        });
    });
});