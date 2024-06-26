const mapStatusHTTPS = require('../utils/mapStatusHTTP');
const { productsService } = require('../services');

const allProducts = async (_req, res) => {
  const { status, data } = await productsService.getAllProducts();

  return res.status(mapStatusHTTPS(status)).json(data);
};

const productById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await productsService.getProductById(Number(id));

  return res.status(mapStatusHTTPS(status)).json(data);
}; 

const insert = async (req, res) => {
  const { name } = req.body;

  const { status, data } = await productsService.insertProduct(name);

  return res.status(mapStatusHTTPS(status)).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { status, data } = await productsService.updateProduct(Number(id), name);

  return res.status(mapStatusHTTPS(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await productsService.deleteProduct(Number(id));

  return res.status(mapStatusHTTPS(status)).json(data);
};

module.exports = {
  allProducts,
  productById,
  insert,
  update,
  deleteProduct,
};
