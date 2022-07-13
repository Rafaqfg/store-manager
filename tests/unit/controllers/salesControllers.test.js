const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const salesControllers = require('../../../controllers/salesControllers');
const salesServices = require('../../../services/salesServices')

chai.use(chaiAsPromised);

describe('controllers/salesControllers', () => {
  beforeEach(sinon.restore);

  describe('Test getAllSalesList function', () => {

    it('should throw error if salesServices.getAllSalesList throw error', () => {
      sinon.stub(salesServices, 'getAllSalesList').rejects();
      return chai.expect(salesControllers.getAllSalesList()).to.eventually.be.rejected;
    })

    it('should call res method and return an array if salesServices.getAllSalesList resolves', async () => {
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

  describe('Test getSaleById function', () => {

    it('should throw error if salesServices.getSaleById(id) throw error', () => {
      sinon.stub(salesServices, 'getSaleById').rejects();
      return chai.expect(salesControllers.getSaleById(1)).to.eventually.be.rejected;
    });

    it('should return status 404 and message "Sale not found" if salesServices.getSaleById(id) dont return anything', async () => {
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

    it('should return status 200 and an array if salesServices.getSaleById(id) resolves', async () => {
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

  describe('Test addProduct function', () => {

    it('should throw error if salesServices.saleIsValid throw error', () => {
      sinon.stub(salesServices, 'saleIsValid').rejects();
      return chai.expect(salesControllers.getSaleById([])).to.eventually.be.rejected;
    })
    it('should throw error if salesServices.addProduct throw error', () => {

    })
    it('should throw error if salesServices.addProduct throw error', () => {

    })

    it('should call res method and return an object if salesServices.listAllProducts resolves', async () => {

    })

  })
});
