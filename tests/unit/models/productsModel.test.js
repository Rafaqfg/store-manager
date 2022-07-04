const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsModel = require('../../../models/productsModel');
const db = require('../../../models/db');

chai.use(chaiAsPromised);

describe('models/productsModel', () => {
  beforeEach(sinon.restore);

  describe('Test listAllProducts function', () => {

    it('should throw error if mysql throw error', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.listAllProducts()).to.eventually.be.rejected;
    })
  
    it('should return an array of objects', () => {
      sinon.stub(db, 'query').resolves([{}]);
      chai.expect(productsModel.listAllProducts()).to.eventually.be.true;
    })
  })

  describe('Test listIdProduct function', () => {

    it('should throw error if mysql throw error', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.listIdProduct(1)).to.eventually.be.rejected;
    })

    it('should return an object', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(productsModel.listAllProducts(1)).to.eventually.be.equal;
    })
    it('should return an object with key name', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(productsModel.listAllProducts(1)).to.eventually.be.equal;
    })
  })
})