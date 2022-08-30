const session = require('supertest-session');
const app = require('../../src/app.js');
const {  conn, Activity } = require('../../src/db.js');
const {expect} = require('chai')

const agent = session(app);

describe('Activity routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(async () => await Activity.sync({ force: false }))
  describe('GET /activities', () => {
    it('should get 200', () =>
     agent.get('/activities').expect(200)
    );
  }); 
  describe('POST /activities', async () => {
    it('should get code 400 when nothing is sent', () =>
      agent.post('/activities').expect(400))
  })})