const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsControllers = require('../../../controllers/productsControllers');
const productsServices = require('../../../services/productsServices')

chai.use(chaiAsPromised);

describe('controllers/productsControllers', () => {
  beforeEach(sinon.restore);

  describe('Test listAllProducts function', () => {

    it('should throw error if productsServices.listAllProducts throw error', () => {
      sinon.stub(productsServices, 'listAllProducts').rejects();
      return chai.expect(productsControllers.listAllProducts()).to.eventually.be.rejected;
    })

    it('should call res method and return an object if productsServices.listAllProducts resolves', async () => {
      sinon.stub(productsServices, 'listAllProducts').resolves([{}]);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      await productsControllers.listAllProducts({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{}]);
    })
  })

  describe('Test listIdProduct function', () => {

    it('should throw error if productsServices.listIdProduct(id) throw error', () => {
      sinon.stub(productsServices, 'listIdProduct').rejects();
      return chai.expect(productsControllers.listIdProduct(1)).to.eventually.be.rejected;
    });

    it('should return status 404 and message "Product not found" if productsServices.listIdProduct(id) dont return anything', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(productsServices, 'listIdProduct').resolves([]);
      await productsControllers.listIdProduct(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(404);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({
        message: 'Product not found'
      });
    });

    it('should return status 200 and an object if productsServices.listIdProduct(id) resolves', async () => {
      const list = [{}];
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(productsServices, 'listIdProduct').resolves(list);
      await productsControllers.listIdProduct(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  })

  describe('Test addProduct function', () => {
    
    it('should throw error if productsServices.validateName throw error', () => {
      sinon.stub(productsServices, 'validateName').rejects();
      return chai.expect(productsControllers.listIdProduct({})).to.eventually.be.rejected;
    })
    it('should throw error if productsServices.addProduct throw error', () => {

    })
    it('should throw error if productsServices.addProduct throw error', () => {
      
    })

    it('should call res method and return an object if productsServices.listAllProducts resolves', async () => {
      
    })

  })
});
