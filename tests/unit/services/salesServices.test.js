const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const salesModel = require('../../../models/salesModel');
const salesServices = require('../../../services/salesServices');
const productsModel = require('../../../models/productsModel');

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

  describe('3. Test salesServices.validateProductId function', () => {

    it('3.1 should throw error if productsModel.listIdProduct throw error', () => {
      sinon.stub(productsModel, 'listIdProduct').rejects();
      return chai.expect(salesServices.validateProductId()).to.eventually.be.rejected;
    });

    it('3.2 should resolves and return an array if productsModel.listIdProduct resolves', () => {
      const idList = [];
      sinon.stub(productsModel, 'listIdProduct').resolves([]);
      return chai.expect(salesServices.validateProductId(idList)).to.eventually.be.equal;
    });
  });

  describe('4. Test salesServices.saleIsValid function', () => {

    it('4.1 should throw error if salesServices.validateSale throw error', () => {
      sinon.stub(salesServices, 'validateSale').rejects();
      return chai.expect(salesServices.saleIsValid()).to.eventually.be.rejected;
    });

    it('4.2 should resolves and return an array if salesServices.validateSale resolves', () => {
      const saleList = [];
      sinon.stub(salesServices, 'validateSale').resolves([]);
      return chai.expect(salesServices.saleIsValid(saleList)).to.eventually.be.equal;
    });
  });

  describe('5. Test salesServices.createSale function', () => {

    it('5.1 should throw error if salesModel.addSaleId throw error', () => {
      sinon.stub(salesModel, 'addSaleId').rejects();
      return chai.expect(salesServices.createSale()).to.eventually.be.rejected;
    });

    it('5.2 should throw error if salesModel.createSale throw error', () => {
      sinon.stub(salesModel, 'addSaleId').resolves(1);
      sinon.stub(salesModel, 'createSale').rejects();

      return chai.expect(salesServices.createSale()).to.eventually.be.rejected;
    });

    it('5.3 should resolves and return an object if salesModel.createSale resolves', () => {
      const newSale = {
        id: 5,
        itemsSold: [],
      };
      const saleList = [];
      const id = 1;
      const list = [{}, {}]
      
      sinon.stub(salesModel, 'createSale').resolves(list);
      return chai.expect(salesServices.createSale(saleList)).to.eventually.be.deep.equal(newSale);
    });
  });

  describe('6. Test salesServices.getAllSalesList function', () => {

    it('6.1 should throw error if salesModel.getAllSalesList throw error', () => {
      sinon.stub(salesModel, 'getAllSalesList').rejects();
      return chai.expect(salesServices.getAllSalesList()).to.eventually.be.rejected;
    });

    it('6.2 should resolves and return an array if salesModel.getAllSalesList', () => {
      sinon.stub(salesModel, 'getAllSalesList').resolves([]);
      return chai.expect(salesServices.getAllSalesList()).to.eventually.be.equal;
    });
  });

  describe('7. Test salesServices.getSaleById function', () => {

    it('7.1 should throw error if salesModel.getSaleById throw error', () => {
      sinon.stub(salesModel, 'getSaleById').rejects();
      return chai.expect(salesServices.getSaleById()).to.eventually.be.rejected;
    });

    it('7.2 should throw error if salesModel.getSaleById returns an empty array', () => {
      sinon.stub(salesModel, 'getSaleById').resolves([]);
      chai.expect(salesServices.getSaleById(1)).to.eventually.throw(Error('Sale not found'));
    });

    it('7.3 should resolves and return an array of objects if salesModel.getSaleById resolves', () => {
      const list = [[]]
      sinon.stub(salesModel, 'getSaleById').resolves(list);
      return chai.expect(salesServices.getSaleById(1)).to.eventually.be.equal;
    });
  });

  describe('8. Test salesServices.updateSale function', () => {

    it('8.1 should throw error if salesModel.updateSale throw error', () => {
      sinon.stub(salesModel, 'updateSale').rejects();
      return chai.expect(salesServices.updateSale()).to.eventually.be.rejected;
    });

    it('8.2 should throw error if salesServices.getSaleById throw error', () => {
      sinon.stub(salesModel, 'updateSale').resolves();
      sinon.stub(salesServices, 'getSaleById').rejects();
      return chai.expect(salesServices.updateSale()).to.eventually.be.rejected;
    });

    it('8.3 should resolves and return an object', () => {
      sinon.stub(salesModel, 'updateSale').resolves();
      sinon.stub(salesServices, 'getSaleById').resolves([{}]);
      return chai.expect(salesServices.updateSale(1, [])).to.eventually.equal;
    });
  });
});