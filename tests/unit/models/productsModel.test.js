const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsModel = require('../../../models/productsModel');
const db = require('../../../models/db');

chai.use(chaiAsPromised);

describe('models/productsModel', () => {
  beforeEach(sinon.restore);

  describe('1. Test productsModel.listAllProducts function', () => {

    it('1.1 should throw error if mysql throw error', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.listAllProducts()).to.eventually.be.rejected;
    })
  
    it('1.2 should return an array of objects', () => {
      sinon.stub(db, 'query').resolves([]);
      return chai.expect(productsModel.listAllProducts()).to.eventually.be.equal();
    })
  });

  describe('2. Test productsModel.listIdProduct function', () => {

    it('2.1 should throw error if mysql throw error', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.listIdProduct(1)).to.eventually.be.rejected;
    })

    it('2.2 should return an object', () => {
      sinon.stub(db, 'query').resolves({});
      return chai.expect(productsModel.listAllProducts(1)).to.eventually.be.equal;
    })

    it('2.3 should return an object with key name', () => {
      sinon.stub(db, 'query').resolves({});
      return chai.expect(productsModel.listAllProducts(1)).to.eventually.be.equal;
    })
  });

  describe('3. Test productsModel.addProduct function', () => {
    const newProduct = {
      id: 1,
      name: 'Martelo',
    };

    it('3.1 should throw error if mysql throw error', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.addProduct(1)).to.eventually.be.rejected;
    })

    it('3.2 should return an object', () => {
      sinon.stub(db, 'query').resolves(newProduct);
      return chai.expect(productsModel.addProduct('Martelo')).to.eventually.be.equal;
    })

    it('3.3 should return an object with keys "id" and "name"', () => {
      sinon.stub(db, 'query').resolves([{ insertId: 1 }]);
      return chai.expect(productsModel.addProduct('Martelo')).to.eventually.be.deep.equal(newProduct);
    })
  });

  describe('4. Test productsModel.updateProduct function', () => {

    it('4.1 should throw error if mysql throw error', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.updateProduct()).to.eventually.be.rejected;
    })

    it('4.2 should return true if mysql resolves', () => {
      const id = 1;
      const name = 'Martelo';
      sinon.stub(db, 'query').resolves([name, id]);
      return chai.expect(productsModel.updateProduct(id, name)).to.eventually.be.true;
    })
  });

  describe('5. Test productsModel.deleteProduct function', () => {

    it('5.1 should throw error if mysql throw error', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.deleteProduct()).to.eventually.be.rejected;
    })

    it('5.2 should return true if mysql resolves',  () => {
      const id = 1;
      sinon.stub(db, 'query').resolves([id]);
      return chai.expect(productsModel.deleteProduct(id)).to.eventually.be.true;
    })
  });

  describe('6. Test productsModel.listProductsByName function', () => {

    it('6.1 should throw error if mysql throw error', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.listProductsByName()).to.eventually.be.rejected;
    })

    it('6.2 should return an array if mysql resolves', () => {
      const q = 'Martelo';
      sinon.stub(db, 'query').resolves([]);
      return chai.expect(productsModel.listProductsByName(q)).to.eventually.be.equal;
    })
  });
});