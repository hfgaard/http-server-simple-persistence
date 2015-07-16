var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var fs = require('fs');
var app = require('../server');

chai.use(chaiHttp);

describe('server.js', function() {
  before(function() {
    fs.writeFileSync('./data/note.json', '{"body":"hello world"}');
  });

  after(function() {
    fs.unlinkSync('./data/note2.json');
  });

  describe('get', function() {
    it('will return a 404 status when asked to GET a file that does not exist', function() {
      chai.request('localhost:3000')
          .get('/empty')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
          });
    });

    it('will return a JSON object when passed a valid file', function(done) {
      chai.request('localhost:3000')
          .get('/note')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res.text).to.eql('{"body":"hello world"}');
            expect(res).to.have.status(200);
            done();
          });
    });
  });

  describe('post', function() {
    it('will return a 409 status when asked to POST to a file that already exists', function() {
      chai.request('localhost:3000')
          .post('/note')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
          });
    });

    it('will create a new file when passed an unused file name and JSON object', function(done) {
      chai.request('localhost:3000')
          .post('/note2')
          .send('{"body": "hello friend"}')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res.text).to.eql('File has been uploaded.');
            expect(res).to.have.status(201);
            done();
          });
    });
  });

  describe('put', function() {
    it('will return a 404 status when asked to PUT to a file that does not exist', function() {
      chai.request('localhost:3000')
          .put('/empty')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
          });
    });

    it('will update an existing file when passed an existing file name and JSON object', function(done) {
      chai.request('localhost:3000')
          .put('/note2')
          .send('{"body": "hello to all my friends"}')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res.text).to.eql('File has been updated.');
            expect(res).to.have.status(200);
            done();
          });
    });
  });

  describe('delete', function() {
    it('will return a 404 status when passed a file that already does not exist', function() {
      chai.request('localhost:3000')
          .del('/empty')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
          });
    });

    it('will delete a file when passed an exisiting file', function(done) {
      chai.request('localhost:3000')
          .del('/note')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(204);
            done();
          });
    });
  });
});
