const { Activity, conn } = require('../../src/db.js');
const {expect, assert} = require('chai')

describe('Activity model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Activity.sync({ force: false }));
    describe('name', () => {
      it('should throw an error if name is null',async ()=> {
        var activity = await Activity.create({}).catch(() =>{})
        assert.equal(activity, null)
      });
    })
    describe('id', () => {
      it('should return null if the wrong Pk is sent', async () => {
        var activity = await Activity.findByPk('ARG').catch(err => {})
        assert.equal(activity, null)
      });
    })
  })
})