/* eslint-disable guard-for-in */
const supertest = require('supertest');
const should = require('should');

// This agent refers to PORT where program is runninng.
const server = supertest.agent('http://localhost:3000');
// const random = Math.random();
const idContact = '';

// UNIT test begin
describe('vipra contacts test.', function() {
  it('should create contacts', function(done) {
    server
        .post('/contact/addOrEdit/')
        .send({name: 'Anusha', email: 'anusha@gmail.com', mobile: '9876543456'})
        .expect('Content-type', /json/)
        .expect(200) // This is HTTP response
        .end(function(err, res) {
          // HTTP status should be 200
          // res.status.should.equal(200);
          // Error key should be false.
          // res.body.result.should.equal(true);
        });
    done();
  });

  it('should return all contacts', function(done) {
    // Test Get All Contacts
    server
        .get('/contact/list')
        .expect('Content-type', /json/)
        .expect(200) // This is HTTP response
        .end(function(err, res) {
          // HTTP status should be 200
          // res.status.should.equal(200);
          // Error key should be false.
          // res.body.result.should.equal(true);
        });
    done();
  });

  it('should update contact', function(done) {
    // Test update contact by id
    if (idContact !== '') {
      server
          .put('/contact/addOrEdit/' + idContact)
          .send({name: 'Anusha1', email: 'anusha@gmail.com', mobile: '9876543456'})
          .expect('Content-type', /json/)
          .expect(200) // This is HTTP response
          .end(function(err, res) {
            // HTTP status should be 200
            res.status.should.equal(200);
            // Error key should be false.
            res.body.result.should.equal(true);
            // Contact should be in json
            should.exist(res.body.contact);
            res.body.contact.should.be.ok;
            // Contact should instance of Object
            res.body.contact.should.be.an.instanceOf(Object);
            // Contact should have property described
            res.body.contact.should.have.properties('name', 'email', 'mobile');
            idContact = res.body.contact._id;
            done();
          });
    } else done();
  });

  it('should delete contact', function(done) {
    // Test get contact by id
    if (idContact !== '') {
      server
          .delete('/contact/delete/' + idContact)
          .expect('Content-type', /json/)
          .expect(200) // This is HTTP response
          .end(function(err, res) {
            // HTTP status should be 200
            res.status.should.equal(200);
            // Error key should be false.
            res.body.result.should.equal(true);
            done();
          });
    } else done();
  });
});
