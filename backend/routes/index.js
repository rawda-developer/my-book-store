import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductImages,
  getProductImage,
  createProductImage,
  updateProductImage,
  deleteProductImage,
  getProductTags,
  getProductTag,
  createProductTag,
  updateProductTag,
  deleteProductTag,
} from './product.js';
const router = express.Router();
router
  .get('/products', getProducts)
  .get('/products/:id', getProduct)
  .post('/products', createProduct)
  .put('/products/:id', updateProduct)
  .delete('/products/:id', deleteProduct)
  .get('/products/:id/images', getProductImages)
  .get('/products/:id/images/:id', getProductImage)
  .post('/products/:id/images', createProductImage)
  .put('/products/:id/images/:id', updateProductImage)
  .delete('/products/:id/images/:id', deleteProductImage)
  .get('/products/:id/tags', getProductTags)
  .get('/products/:id/tags/:id', getProductTag)
  .post('/products/:id/tags', createProductTag)
  .put('/products/:id/tags/:id', updateProductTag)
  .delete('/products/:id/tags/:id', deleteProductTag);

export default router;
