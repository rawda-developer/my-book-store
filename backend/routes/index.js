import express from 'express';
import multer from 'multer';
import path from 'path';
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
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
var upload = multer({ storage: storage });

router
  .get('/products', getProducts)
  .get('/products/:id', getProduct)
  .post('/products', createProduct)
  .put('/products/:id', updateProduct)
  .delete('/products/:id', deleteProduct)
  .post('/products/:id/images', upload.single('file'), uploadImage)
  .get('/products/:id/tags', getProductTags)
  .get('/products/:id/tags/:id', getProductTag)
  .post('/products/:id/tags', createProductTag)
  .put('/products/:id/tags/:id', updateProductTag)
  .delete('/products/:id/tags/:id', deleteProductTag);

export default router;
