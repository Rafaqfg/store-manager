const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsModel = require('../../../models/productsModel');
const productsServices = require('../../../services/productsServices');

chai.use(chaiAsPromised);

describe('services/productsServices', () => {
  beforeEach(sinon.restore);

  describe('1. Test productsServices.listAllProducts function', () => {

    it('1.1 should throw error if productModel.listAllProducts throw error', () => {
      sinon.stub(productsModel, 'listAllProducts').rejects();
      return chai.expect(productsServices.listAllProducts()).to.eventually.be.rejected;
    })

    it('1.2 should resolves if productModel.listAllProducts resolves', () => {
      sinon.stub(productsModel, 'listAllProducts').resolves();
      return chai.expect(productsServices.listAllProducts()).to.eventually.be.fulfilled;
    })
  });

  describe('2. Test productsServices.listIdProduct function', () => {

    it('2.1 should throw error if productModel.listIdProduct throw error', () => {
      sinon.stub(productsModel, 'listIdProduct').rejects();
      return chai.expect(productsServices.listIdProduct()).to.eventually.be.rejected;
    })

    it('2.2 should resolves if productModel.listIdProduct resolves', () => {
      sinon.stub(productsModel, 'listIdProduct').resolves();
      return chai.expect(productsServices.listIdProduct()).to.eventually.be.fulfilled;
    })
  });

  describe('3. Test productsServices.addProduct function', () => {

    it('3.1 should throw error if productModel.addProduct throw error', () => {
      sinon.stub(productsModel, 'addProduct').rejects();
      return chai.expect(productsServices.addProduct()).to.eventually.be.rejected;
    })

    it('3.2 should resolves if productModel.addProduct resolves', () => {
      sinon.stub(productsModel, 'addProduct').resolves();
      return chai.expect(productsServices.addProduct()).to.eventually.be.fulfilled;
    })
  });

  describe('4. Test productsServices.listProductsByName function', () => {

    it('4.1 should throw error if productModel.listProductsByName throw error', () => {
      sinon.stub(productsModel, 'listProductsByName').rejects();
      return chai.expect(productsServices.listProductsByName()).to.eventually.be.rejected;
    })

    it('4.2 should resolves if productModel.listProductsByName resolves', () => {
      sinon.stub(productsModel, 'listProductsByName').resolves();
      return chai.expect(productsServices.listProductsByName()).to.eventually.be.fulfilled;
    })
  });

  describe('5. Test productsServices.deleteProduct function', () => {

    it('5.1 should throw error if productModel.deleteProduct throw error', () => {
      sinon.stub(productsModel, 'deleteProduct').rejects();
      return chai.expect(productsServices.deleteProduct()).to.eventually.be.rejected;
    })

    it('5.2 should resolves if productModel.deleteProduct resolves', () => {
      sinon.stub(productsModel, 'deleteProduct').resolves();
      return chai.expect(productsServices.deleteProduct()).to.eventually.be.true;
    })
  });

})