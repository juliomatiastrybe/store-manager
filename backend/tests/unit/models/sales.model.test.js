const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSales, 
  saleFindIdIs1,
  salesSuccessModel } = require('../mocks/sales.mock');

describe('Testa salesModel', function () {
  it('Testa se a model retorna do DB todas as vendas', async function () {
    // triploA - Arrange, Act, Assert
    // Arrange
    sinon.stub(connection, 'execute').resolves([allSales]);

    // Act
    const sales = await salesModel.getAllFromDB();

    // Assert
    expect(sales).to.be.an('array');
    expect(sales[0]).to.be.an('object');
    expect(sales).to.be.deep.equal(allSales);
  });

  it('Testa se a model retorna do DB todas as vendas encontrada por id', async function () {
    // triploA - Arrange, Act, Assert
    // Arrange
    const id = 1;
    sinon.stub(connection, 'execute').resolves([saleFindIdIs1]);

    // Act
    const sale = await salesModel.findById(id);

    // Assert
    expect(sale[0]).to.be.an('object');
    expect(sale).to.be.deep.equal([{
      saleId: 1,
      sales: [
        {
          date: '2024-02-24T21:27:35.000Z',
          productId: 1,
          productName: 'Martelo de Thor',
          quantity: 5,
        },
        {
          date: '2024-02-24T21:27:35.000Z',
          productId: 2,
          productName: 'Traje de encolhimento',
          quantity: 10,
        },
      ],
    }]);
  });

  it('Testa se a model insere no DB uma nova venda', async function () {
    // triploA - Arrange, Act, Assert
    // Arrange
    const insertId = salesSuccessModel.id;
    const executeStub = sinon.stub(connection, 'execute');

    executeStub.onFirstCall().resolves([{ insertId }]);
    executeStub.resolves([{ affectedRows: 1 }]);

    // Act
    const sale = await salesModel.insert([
      {
        productId: 1,
        quantity: 5,
      },
      {
        productId: 2,
        quantity: 10,
      },
    ]);

    // Assert
    expect(sale).to.be.an('object');
    expect(sale).to.be.deep.equal(salesSuccessModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});