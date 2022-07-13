const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsModel = require('../../../models/productsModel');
const productsServices = require('../../../services/productsServices');

chai.use(chaiAsPromised);

describe('services/productsServices', () => {
  beforeEach(sinon.restore);

  describe('Test listAllProducts function', () => {

    it('should throw error if productModel.listAllProducts throw error', () => {
      sinon.stub(productsModel, 'listAllProducts').rejects();
      return chai.expect(productsServices.listAllProducts()).to.eventually.be.rejected;
    })

    it('should resolves if productModel.listAllProducts resolves', () => {
      sinon.stub(productsModel, 'listAllProducts').resolves();
      return chai.expect(productsServices.listAllProducts()).to.eventually.be.fulfilled;
    })
  })

  describe('Test listIdProduct function', () => {

    it('should throw error if productModel.listIdProduct throw error', () => {
      sinon.stub(productsModel, 'listIdProduct').rejects();
      return chai.expect(productsServices.listIdProduct()).to.eventually.be.rejected;
    })

    it('should resolves if productModel.listIdProduct resolves', () => {
      sinon.stub(productsModel, 'listIdProduct').resolves();
      return chai.expect(productsServices.listIdProduct()).to.eventually.be.fulfilled;
    })
  })
})