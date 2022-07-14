const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const salesControllers = require('../../../controllers/salesControllers');
const salesServices = require('../../../services/salesServices');

chai.use(chaiAsPromised);

describe('controllers/salesControllers', () => {
  beforeEach(sinon.restore);

  describe('1. Test getAllSalesList function', () => {

    it('1.1 should throw error if salesServices.getAllSalesList throw error', () => {
      sinon.stub(salesServices, 'getAllSalesList').rejects();
      return chai.expect(salesControllers.getAllSalesList()).to.eventually.be.rejected;
    })

    it('1.2 should call res method and return an array if salesServices.getAllSalesList resolves', async () => {
      sinon.stub(salesServices, 'getAllSalesList').resolves([]);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      await salesControllers.getAllSalesList({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([]);
    })
  })

  describe('2. Test getSaleById function', () => {

    it('2.1 should throw error if salesServices.getSaleById(id) throw error', () => {
      sinon.stub(salesServices, 'getSaleById').rejects();
      return chai.expect(salesControllers.getSaleById(1)).to.eventually.be.rejected;
    });

    it('2.2 should return status 404 and message "Sale not found" if salesServices.getSaleById(id) dont return anything', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(salesServices, 'getSaleById').resolves();
      await salesControllers.getSaleById(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(404);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({
        message: 'Sale not found'
      });
    });

    it('2.3 should return status 200 and an array if salesServices.getSaleById(id) resolves', async () => {
      const list = [];
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(salesServices, 'getSaleById').resolves(list);
      await salesControllers.getSaleById(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([]);
    });
  })

  describe('3. Test createSale function', () => {

    it('3.1 should throw error if salesServices.saleIsValid throw error', () => {
      const sale = [];
      sinon.stub(salesServices, 'saleIsValid').rejects(sale);
      return chai.expect(salesControllers.createSale([])).to.eventually.be.rejected;
    })
    it('3.2 should throw error if salesServices.validateId throw error', () => {
      const sale = [];
      sinon.stub(salesServices, 'saleIsValid').resolves(sale);
      sinon.stub(salesServices, 'validateId').rejects(sale);
      return chai.expect(salesControllers.createSale([])).to.eventually.be.rejected;

    })
    it('3.3 should throw error if salesServices.validateId return an empty array', async () => {
      // const error = Error('Product not found');
      // const emptyList = [];
      // const req = {
      //   body: [{
      //     "productId": 8,
      //     "quantity": 1
      //   }]
      // };
      // const res = {};
      // const create = await salesControllers.createSale(req, res);
      // sinon.stub(salesServices, 'saleIsValid').returns(true);
      // sinon.stub(salesServices, 'validateId').returns(emptyList);
      // // sinon.stub(salesControllers, 'createSale').throw(Error, 'Product not found');
      // return chai.expect(salesControllers.createSale.bind(salesControllers, 'createSale')).to.throw(new Error('Product not found'));
    })

    it('3.4 should call res method and return an object if salesServices.createSale resolves', async () => {
      const obj = {};
      const req = {
        body: [{
          "productId": 1,
          "quantity": 1
        }] };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(salesServices, 'createSale').resolves(obj);
      await salesControllers.createSale(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(201);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal(obj);
    })
  })
});
