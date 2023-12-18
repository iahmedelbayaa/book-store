import chai from 'chai';
import request from 'supertest';
const app = require('../server');

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

describe('GET /books', function () {
  it('return list of books', function (done) {
    request(app)
      .get('/api/v1/books')
      .expect(200)
      .expect((res) => {
        console.log('book list >>> ' + JSON.stringify(res.text));
      })
      .end(done);
  });
});
