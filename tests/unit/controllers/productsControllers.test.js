const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsControllers = require('../../../controllers/productsControllers');
const productsService = require('../../../services/productsService')

chai.use(chaiAsPromised);

describe('controllers/productsControllers', () => {
  beforeEach(sinon.restore);

  describe('Test listAllProducts function', () => {

    it('should throw error if productsService.listAllProducts throw error', () => {
      sinon.stub(productsService, 'listAllProducts').rejects();
      return chai.expect(productsControllers.listAllProducts()).to.eventually.be.rejected;
    })

    it('should call res method and return an object if productsService.listAllProducts resolves', async () => {
      sinon.stub(productsService, 'listAllProducts').resolves([{}]);
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

    it('should throw error if productsService.listIdProduct(id) throw error', () => {
      sinon.stub(productsService, 'listIdProduct').rejects();
      return chai.expect(productsControllers.listIdProduct(1)).to.eventually.be.rejected;
    });

    it('should return status 404 and message "Product not found" if productsService.listIdProduct(id) dont return anything', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(productsService, 'listIdProduct').resolves([]);
      await productsControllers.listIdProduct(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(404);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({
        message: 'Product not found'
      });
    });

    it('should return status 200 and an object if productsService.listIdProduct(id) resolves', async () => {
      const list = [{}];
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(productsService, 'listIdProduct').resolves(list);
      await productsControllers.listIdProduct(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  })
});
