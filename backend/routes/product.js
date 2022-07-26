import Product from '../models/Product.js';

import ProductTag from '../models/ProductTag.js';
import ImageResizer from '../utils/ImageResizer.js';
import path from 'path';

// Product CRUD
export const getProducts = (req, res) => {
  Product.find({})
    .populate('tags')
    .populate('images')
    .exec((err, products) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(products);
      }
    });
};
export const getProduct = (req, res) => {
  Product.findById(req.params.id)
    .populate('tags')
    .populate('images')
    .exec((err, product) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(product);
      }
    });
};
export const createProduct = (req, res) => {
  const product = new Product(req.body);
  product.save((err, product) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(product);
    }
  });
};

export const updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('tags')
    .populate('images')
    .exec((err, product) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(product);
      }
    });
};
export const deleteProduct = (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, product) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(product);
    }
  });
};
// Image Resizing
