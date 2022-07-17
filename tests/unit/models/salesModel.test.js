const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const salesModel = require('../../../models/salesModel');
const db = require('../../../models/db');

chai.use(chaiAsPromised);

describe('models/salesModel', () => {
  beforeEach(sinon.restore);

  describe('1. Test salesModel.createSale function', () => {

    it('1.1 should throw error if mysql throw error', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(salesModel.createSale()).to.eventually.be.rejected;
    });

    it('1.2 should resolves if mysql resolves', async () => {
      sinon.stub(db, 'query').resolves();
      return chai.expect(salesModel.createSale()).to.eventually.be.fulfilled;
    });
  });

  describe('2. Test salesModel.addSale function', () => {

    it('2.1 should throw error if mysql throw error', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(salesModel.addSaleId()).to.eventually.be.rejected;
    });

    it('2.2 should resolves if mysql resolves', async () => {
      sinon.stub(db, 'query').resolves({});
      return chai.expect(salesModel.addSaleId()).to.eventually.be.equal;
    });

    it('2.3 should resolves if mysql resolves and return an "id"', async () => {
      sinon.stub(db, 'query').resolves([{ insertId: 1 }]);
      return chai.expect(salesModel.addSaleId()).to.eventually.be.equal(1);
    });
  })

  describe('3. Test salesModel.getAllSalesList function', () => {

    it('3.1 should throw error if mysql throw error', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(salesModel.getAllSalesList()).to.eventually.be.rejected;
    });

    it('3.2 should resolves if mysql resolves', async () => {
      sinon.stub(db, 'query').resolves([]);
      return chai.expect(salesModel.getAllSalesList()).to.eventually.be.equal;
    });
  })

  describe('4. Test salesModel.deleteSale function', () => {

    it('1.1 should throw error if mysql throw error', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(salesModel.deleteSale()).to.eventually.be.rejected;
    });

    it('1.2 should return true if mysql resolves', async () => {
      const id = 1;
      sinon.stub(db, 'query').resolves([]);
      return chai.expect(salesModel.deleteSale(1)).to.eventually.be.equal(true);
    });
  });
});
