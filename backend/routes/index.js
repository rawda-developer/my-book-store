import express from 'express';

import upload from '../middleware/upload';

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from './product.js';
import {
  getProductTags,
  getProductTag,
  createProductTag,
  updateProductTag,
  deleteProductTag,
} from './productTag.js';
import { uploadImage, getImage, getProductImages } from './image.js';
import { register, login, logout } from './userAuthManagement.js';
import auth from './auth';
const router = express.Router();

router
  .get('/products', getProducts)
  .get('/products/:id', getProduct)
  .post('/products', createProduct)
  .put('/products/:id', updateProduct)
  .delete('/products/:id', deleteProduct)
  .post('/products/:id/images', upload.single('image'), uploadImage)
  .get('/images/:id', getImage)
  .get('/products/:id/images', getProductImages)
  .get('/products/:id/tags', getProductTags)
  .get('/products/:id/tags/:id', getProductTag)
  .post('/products/:id/tags', createProductTag)
  .put('/products/:id/tags/:id', updateProductTag)
  .delete('/products/:id/tags/:id', deleteProductTag)
  .post('/register', register)
  .post('/login', login)
  .post('/logout', auth.required, logout);
export default router;
