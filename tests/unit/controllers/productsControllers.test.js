const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsControllers = require('../../../controllers/productsControllers');
const productsServices = require('../../../services/productsServices');
const { expect } = require('chai');

chai.use(chaiAsPromised);

describe('controllers/productsControllers', () => {
  beforeEach(sinon.restore);

  describe('1. Test productsControllers.listAllProducts function', () => {

    it('1.1 should throw error if productsServices.listAllProducts throw error', () => {
      sinon.stub(productsServices, 'listAllProducts').rejects();
      return chai.expect(productsControllers.listAllProducts()).to.eventually.be.rejected;
    })

    it('1.2 should call res method and return an object if productsServices.listAllProducts resolves', async () => {
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

  describe('2. Test productsControllers.listIdProduct function', () => {

    it('2.1 should throw error if productsServices.listIdProduct(id) throw error', () => {
      sinon.stub(productsServices, 'listIdProduct').rejects();
      return chai.expect(productsControllers.listIdProduct(1)).to.eventually.be.rejected;
    });

    it('2.2 should return status 404 and message "Product not found" if productsServices.listIdProduct(id) dont return anything', async () => {
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

    it('2.3 should return status 200 and an object if productsServices.listIdProduct(id) resolves', async () => {
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

  describe('3. Test productsControllers.addProduct function', () => {
    
    it('3.1 should throw error if productsServices.validateName throw error', () => {
      sinon.stub(productsServices, 'validateName').rejects();
      return chai.expect(productsControllers.addProduct({}, {})).to.eventually.be.rejected;
    })
    it('3.2 should throw error if productsServices.addProduct throw error', () => {
      sinon.stub(productsServices, 'validateName').resolves('Martelo');
      sinon.stub(productsServices, 'addProduct').rejects();
      return chai.expect(productsControllers.addProduct({}, {})).to.eventually.be.rejected;
    })
  
    it('3.3 should call res method and return an object if productsControllers.addProduct resolves', async () => {
      const req = { body: { name: 'Martelo' } };
      const newProduct = {
        id: 1,
        name: 'Martelo'
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(productsServices, 'validateName').resolves('Martelo');
      sinon.stub(productsServices, 'addProduct').resolves(newProduct);
      await productsControllers.addProduct(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(201);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal(newProduct);
    })
  });

  describe('4. Test productsControllers.updateProduct function', () => {

    it('4.1 should throw error if productsServices.productExist throw error', () => {
      sinon.stub(productsServices, 'productExist').rejects();
      return chai.expect(productsControllers.updateProduct({}, {})).to.eventually.be.rejected;
    })

    it('4.2 should throw error if productsServices.validateName throw error', () => {
      const req = { params: { id: 1 } };
      sinon.stub(productsServices, 'productExist').resolves(true);
      sinon.stub(productsServices, 'validateName').rejects();
      return chai.expect(productsControllers.updateProduct(req, {})).to.eventually.be.rejected;
    })

    it('4.3 should throw error if productsServices.updateProduct throw error', async () => {
      const req = {
        body: { name: 'Martelo' },
        params: { id: 1 },
      };
      sinon.stub(productsServices, 'productExist').resolves(true);
      sinon.stub(productsServices, 'validateName').resolves(true);
      sinon.stub(productsServices, 'updateProduct').rejects();
      return chai.expect(productsControllers.updateProduct(req, {})).to.eventually.be.rejected;
    })

    it('4.4 should call res method and return an object if productsControllers.updateProduct resolves', async () => {
      const req = {
        body: { name: 'Martelo' },
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      const productUpdated = {
        id: 1,
        name: 'Martelo'
      };
      sinon.stub(productsServices, 'productExist').resolves(true);
      sinon.stub(productsServices, 'validateName').resolves(true);
      sinon.stub(productsServices, 'updateProduct').resolves([productUpdated]);
      await productsControllers.updateProduct(req, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal(productUpdated);
    })
  });

  describe('5. Test productsControllers.deleteProduct function', () => {

    it('5.1 should throw error if productsServices.validateName throw error', () => {
      sinon.stub(productsServices, 'productExist').rejects();
      return chai.expect(productsControllers.deleteProduct({}, {})).to.eventually.be.rejected;
    })
    it('5.2 should throw error if productsServices.deleteProduct throw error', () => {
      const req = { params: { id: 1 } };
      sinon.stub(productsServices, 'productExist').resolves(true);
      sinon.stub(productsServices, 'deleteProduct').rejects();
      return chai.expect(productsControllers.deleteProduct(req, {})).to.eventually.be.rejected;
    })

    it('5.3 should call res method if productsControllers.deleteProduct resolves', async () => {
      const req = { params: { id: 1 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub();
      sinon.stub(productsServices, 'productExist').resolves(true);
      sinon.stub(productsServices, 'deleteProduct').resolves(true);
      await productsControllers.deleteProduct(req, res);
      return chai.expect(res.status.calledWith(204)).to.be.equal(true);
    })
  });

  describe('6. Test productsControllers.listProductsByName function', () => {
    const req = { query: { q: 'Martelo' } };

    it('6.1 should return all products if "q" is invalid',async  () => {
      const req = { query: { q: '' } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(productsServices, 'listAllProducts').resolves([{}]);
      await productsControllers.listProductsByName(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{}]);
    })

    it('6.2 should throw error if "q" is invalid and productsServices.listAllProducts throw error', async () => {
      sinon.stub(productsServices, 'listAllProducts').rejects();
      return chai.expect(productsControllers.listProductsByName({}, {})).to.eventually.be.rejected;
    })

    it('6.3 should throw error if "q" is valid and productsServices.validateName throw error', () => {
      sinon.stub(productsServices, 'validateName').rejects();
      return chai.expect(productsControllers.listProductsByName(req, {})).to.eventually.be.rejected;
    })

    it('6.4 should throw error if "q" is valid and productsServices.listProductsByName throw error', () => {
      sinon.stub(productsServices, 'validateName').resolves(true);
      sinon.stub(productsServices, 'listProductsByName').rejects()
      return chai.expect(productsControllers.listProductsByName(req, {})).to.eventually.be.rejected;
    })

    it('4.4 should call res method and return an array if productsControllers.listProductsByName resolves', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      const productUpdated = [];
      sinon.stub(productsServices, 'validateName').resolves(true);
      sinon.stub(productsServices, 'listProductsByName').resolves([])
      await productsControllers.listProductsByName(req, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal(productUpdated);
    })
  });
});
