import express from 'express';

import upload from '../middleware/upload';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductTags,
  getProductTag,
  createProductTag,
  updateProductTag,
  deleteProductTag,
  uploadImage,
} from './product.js';

const router = express.Router();

router
  .get('/products', getProducts)
  .get('/products/:id', getProduct)
  .post('/products', createProduct)
  .put('/products/:id', updateProduct)
  .delete('/products/:id', deleteProduct)
  .post('/products/:id/images', upload.single('image'), uploadImage)
  .get('/products/:id/tags', getProductTags)
  .get('/products/:id/tags/:id', getProductTag)
  .post('/products/:id/tags', createProductTag)
  .put('/products/:id/tags/:id', updateProductTag)
  .delete('/products/:id/tags/:id', deleteProductTag);

export default router;
