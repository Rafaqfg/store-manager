const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const salesModel = require('../../../models/salesModel');
const salesServices = require('../../../services/salesServices');

chai.use(chaiAsPromised);

describe('services/salesServices', () => {
  beforeEach(sinon.restore);

  describe('1. Test salesServices.saleExist function', () => {

    it('1.1 should throw error if salesServices.getSaleById throw error', () => {
      sinon.stub(salesServices, 'getSaleById').rejects();
      return chai.expect(salesServices.saleExist()).to.eventually.be.rejected;
    });

    it('1.2 should resolves if salesServices.getSaleById resolves', () => {
      const id = 1;
      sinon.stub(salesServices, 'getSaleById').resolves([]);
      return chai.expect(salesServices.saleExist(id)).to.eventually.be.true;
    });
  });

  describe('2. Test salesServices.deleteSale function', () => {

    it('2.1 should throw error if salesModel.deleteSale throw error', () => {
      sinon.stub(salesModel, 'deleteSale').rejects();
      return chai.expect(salesServices.deleteSale()).to.eventually.be.rejected;
    });

    it('2.2 should resolves if salesModel.deleteSale', () => {
      const id = 1;
      sinon.stub(salesModel, 'deleteSale').resolves(true);
      return chai.expect(salesServices.deleteSale(id)).to.eventually.be.true;
    });
  });
});