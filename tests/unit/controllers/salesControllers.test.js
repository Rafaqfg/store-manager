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

    it('1.2 should call res method and return an array if getAllSalesList resolves', async () => {
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

    it('2.2 should return status 200 and an array if getSaleById(id) resolves', async () => {
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
    it('3.2 should throw error if salesServices.validateProductId throw error or return an empty array', () => {
      const sale = [];
      sinon.stub(salesServices, 'saleIsValid').resolves(sale);
      sinon.stub(salesServices, 'validateProductId').rejects(false);
      return chai.expect(salesControllers.createSale([])).to.eventually.be.rejected;

    })

    it('3.3 should call res method with status 201 and return an object if createSale resolves', async () => {
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

  describe('4. Test deleteSale function', () => {

    it('4.1 should throw error if salesServices.saleExist throw error', () => {
      sinon.stub(salesServices, 'saleExist').rejects(false);
      return chai.expect(salesControllers.deleteSale()).to.eventually.be.rejected;
    })
    it('4.2 should throw error if salesServices.deleteSale throw error', () => {
      sinon.stub(salesServices, 'saleExist').resolves(true);
      sinon.stub(salesServices, 'deleteSale').rejects(false);
      return chai.expect(salesControllers.deleteSale()).to.eventually.be.rejected;
    })

    it('4.3 should call res method with status 204 if deleteSale resolves', async () => {
      const req = { params: { id: 1 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub();
      sinon.stub(salesServices, 'saleExist').resolves(true);
      sinon.stub(salesServices, 'deleteSale').resolves(true);
      await salesControllers.deleteSale(req, res);
      return chai.expect(res.status.calledWith(204)).to.be.equal(true);
    })
  })

  describe('5. Test updateSale function', () => {
    const obj = {};
    const sale = [];
    const res = {};
    const req = {
      params: { id: 1 },
      body: [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ],
    };
    it('5.1 should throw error if salesServices.saleExist throw error', () => {
      sinon.stub(salesServices, 'saleExist').rejects(false);
      return chai.expect(salesControllers.updateSale()).to.eventually.be.rejected;
    })
    it('5.2 should throw error if salesServices.saleIsValid throw error', () => {
      sinon.stub(salesServices, 'saleExist').resolves(true);
      sinon.stub(salesServices, 'saleIsValid').rejects();
      return chai.expect(salesControllers.updateSale()).to.eventually.be.rejected;
    })

    it('5.3 should throw error if salesServices.validateProductId throw error', () => {
      sinon.stub(salesServices, 'saleExist').resolves(true);
      sinon.stub(salesServices, 'saleIsValid').resolves(sale);
      sinon.stub(salesServices, 'validateProductId').rejects();
      return chai.expect(salesControllers.updateSale()).to.eventually.be.rejected;
    })

    

    it('5.4 should throw error if salesServices.validateProductId returns an empty array', async () => {
      sinon.stub(salesServices, 'saleExist').resolves(true);
      sinon.stub(salesServices, 'saleIsValid').resolves(sale);
      sinon.stub(salesServices, 'validateProductId').resolves([]);
      const response = await salesControllers.updateSale(req, res);
      return chai.expect(response).to.eventually.be.rejectedWith(Error('Product not found'));
    })



    
    it('5.5 should throw error if salesServices.updateSale throw error', () => {
      const sale = [{}];
      sinon.stub(salesServices, 'saleExist').resolves(true);
      sinon.stub(salesServices, 'saleIsValid').resolves(sale);
      sinon.stub(salesServices, 'validateProductId').resolves(true);
      sinon.stub(salesServices, 'updateSale').rejects();
      return chai.expect(salesControllers.updateSale()).to.eventually.be.rejected;
    })

    it('5.6 should call res method with status 200 and return an object if updateSale resolves', async () => {
      const res = {};
      const result = {
        saleId: 2,
        itemsUpdated: [
          {
            productId: 1,
            quantity: 10
          },
          {
            productId: 2,
            quantity: 50
          }
        ]
      };
      // const res = {
      //   status: sinon.stub().callsFake(() => res),
      //   json: sinon.stub().returns(),
      // };
      sinon.stub(salesServices, 'saleExist').resolves(true);
      sinon.stub(salesServices, 'saleIsValid').resolves(sale);
      sinon.stub(salesServices, 'validateProductId').resolves([[{}], [{}]]);
      sinon.stub(salesServices, 'updateSale').resolves(result);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(result);
      const response = await salesControllers.updateSale(req, res);
      // chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      // chai.expect(res.json.getCall(0).args[0]).to.deep.equal(obj);
      chai.expect(res.status.calledWith(200)).to.be.equal(true);
      chai.expect(response).to.be.an('object').with.keys('saleId', 'itemsUpdated');
    })
  })
});
