const app = require('../../app');
const should = require('should');
const request = require('supertest')(app);


describe('contacts controller', () => {

    describe('user not logged', () => {

        it('GET "/contacts" redirect to GET "/"', (done) =>{
            request.get('/contacts').end((err, res) => {
                res.headers.location.should.eql('/');
                done();
            });
        });

        it('GET "/contact/1" redirect to GET "/"', (done) =>{
            request.get('/contact/1').end((err, res) => {
                res.headers.location.should.eql('/');
                done();
            });
        });

        it('GET "/contact/1/edit" redirect to GET "/"', (done) =>{
            request.get('/contact/1/edit').end((err, res) => {
                res.headers.location.should.eql('/');
                done();
            });
        });

        it('POST "/contact" redirect to GET "/"', (done) =>{
            request.post('/contact').end((err, res) => {
                res.headers.location.should.eql('/');
                done();
            });
        });

        it('DELETE "/contact/1" redirect to GET "/"', (done) =>{
            request.del('/contact/1').end((err, res) => {
                res.headers.location.should.eql('/');
                done();
            });
        });

        it('PUT "/contact/1" redirect to GET "/"', (done) =>{
            request.put('/contact/1').end((err, res) => {
                res.headers.location.should.eql('/');
                done();
            });
        });

    });

    describe('user logged', () => {
        const user = {name: 'test', email: 'test@test.com'}
        const contact = user;
        let cookie = null;

        beforeEach((done) => {
            request.post('/login').send({user}).end((err, res) => {
                cookie = res.headers['set-cookie'];
                done();
            });
        });

        it('GET "/contacts" return status 200', (done) =>{
            const req = request.get('/contacts');
            req.cookies = cookie;
            req.end((err, res) => {
                res.status.should.eql(200);
                done();
            });
        });

        it('POST "/contact" redirect to GET "/contacts"', (done) =>{
            const req = request.post('/contact');
            req.cookies = cookie;
            req.send({contact}).end((err, res) => {
                res.headers.location.should.eql('/contacts');
                done();
            });
        });

    });


    
});