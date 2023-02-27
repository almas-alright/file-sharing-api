const fs = require('fs');
const request = require('supertest');
const server = require('../../src/server');
const { FILES } = require('../../src/routes/urls');
server.use(require('../../src/routes/index'));
jest.setTimeout(25000);
describe(`Upload file`, function () {
    let file = `dummy.txt`;
    // file.data = Buffer.from(file.buffer).toString();
    // file.name = 'dummy.txt';
    it('Should respond with 400', (done) => {
        request(server).post(`${FILES.POST_FILE}`).expect(400, done);
    });
});

describe(`Get file`, function () {
    it('Should respond with 404', function (done) {
        request(server)
            .get(`${FILES.GET_FILE.replace(':publicKey', 'invalidKey')}`)
            .expect(404, done);
    });
});

describe(`Delete file`, function () {
    it('responds with json', function (done) {
        request(server)
            .get(`${FILES.DELETE_FILE.replace(':privateKey', 'invalidKey')}`)
            .expect(404, done);
    });
});
