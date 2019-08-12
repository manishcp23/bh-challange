require('mocha');
const serverApp = require('../../app.js');
const request = require('supertest')(serverApp);
const db = require('../../db/index');
const dominoclient = require('../../lib/dominoclient');
const fs = require('fs');
const mockSession = require('mock-session');
const utils = require('../../lib/utils');
const jwtConf = utils.conf.jwt;
 

var randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

const adminParams = {
    name: 'Thiruvadi Balaji R',
    mail: 'Thiruvadi_Balaji_R@mckinsey.com'
  };
let cookie = mockSession('session', jwtConf.secret, adminParams);
const attachment = {
    fileID: randomFixedInteger(12),
    mailUNID: '151325138944',
    bookingUNID: '5D43184E63262724652583F900111111',
    downloadURL: 'http://localhost:3000/download/11111111111',
};
const addCallResult = db.addAttachment(attachment);

const backupDbPath = 'it/appdev/qa3/vg_group2_bkdev.nsf';
const createDocPath = 'it/appdev/qa3/vgapi_dev.nsf';
const hostname = 'http://tvm-maildb02.ads.mckinsey.com';
const data = {
    fileID: randomFixedInteger(12),
    dbPath: backupDbPath,
    bookingUNID: '5D43184E63262724652583F900222222',
    rt: fs.createReadStream('./test/integration/list.txt')
  };
describe('remove Attachment test cases', () => {
    before(async () => {
        const jobId = await dominoclient.createDocument(hostname, createDocPath, data);
        const createDataInDb = await db.addAttachment({
            fileID: randomFixedInteger(12),
            mailUNID: '151325138944',
            bookingUNID: data.bookingUNID,
            downloadURL: 'http://localhost:3000/download/22222222222',
        });
        await fs.unlinkSync('./test/integration/list.txt'); // Remove the test file
      });
    it('it should render remove attachment page for Admin', (done) => {
        request
          .get('/removeAttachment')
          .set('Cookie', cookie)
          .expect(200)
          .end(done);
    });
    it('it should not render remove attachment page for anonymous user', (done) => {
        request
        .get('/removeAttachment')
        .expect(302)
        .end(done);
    });
    it('it should send 200 for correct booking UNID', (done) => {
        request
        .get('/removeAttachment')
        .set('Accept', 'application/json')
        .set('Cookie', cookie)
        .query({
            requestId: attachment.bookingUNID
        })
        .expect(200)
        .end(done);
    });
    it('it should send 200 for correct Job ID ', (done) => {
        request
        .get('/removeAttachment')
        .set('Accept', 'application/json')
        .set('Cookie', cookie)
        .query({
            requestId: data.bookingUNID
        })
        .expect(200)
        .end(done);
    });
    it('it should send 400 for incorrect request id', (done) => {
        request
        .get('/removeAttachment')
        .set('Accept', 'application/json')
        .set('Cookie', cookie)
        .query({
            requestId: '2423424242421342412232'
        })
        .expect(400)
        .end(done);
    });
    it('it should send 204 for no attachments found with unique id', (done) => {
        request
        .get('/removeAttachment')
        .set('Accept', 'application/json')
        .set('Cookie', cookie)
        .query({
            requestId: '5D43184E63262724652583F900111111'
        })
        .expect(200)
        .end(done);
    });
    it('it should send 200 success for correct file id', (done) => {
        request
        .post('/removeAttachment')
        .set('Accept', 'application/json')
        .set('Cookie', cookie)
        .send({
            requestId: attachment.bookingUNID,
            fileIds: [attachment.fileID]
        })
        .expect(200)
        .end(done);
    });
    it('it should send 400 for empty file ids array', (done) => {
        request
        .post('/removeAttachment')
        .set('Accept', 'application/json')
        .set('Cookie', cookie)
        .send({
            requestId: attachment.bookingUNID,
            fileIds: []
        })
        .expect(400)
        .end(done);
    });
});