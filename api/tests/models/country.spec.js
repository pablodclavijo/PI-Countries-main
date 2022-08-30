const { assert } = require('chai');
const { Country, conn } = require('../../src/db.js');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: false }));
    describe('name', () => {
      it('should return undefined if name is null', async () => {
        var country = await Country.create({}).catch((err) => {})
        assert.equal(country, undefined)
      });
    })
    describe('id', () => {
      it('should find countries by Pk', async () => {
        var country = await Country.findByPk('ARG').catch(err => {})
       assert.property(country, "id")
       assert.property(country, "name")
      });
    })
  })
})