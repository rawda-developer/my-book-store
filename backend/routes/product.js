import Product from '../models/Product.js';
import ProductImage from '../models/ProductImage.js';
import ProductTag from '../models/ProductTag.js';
import multer from 'multer';
export const getProducts = (req, res) => {
  Product.find({})
    .populate('tags')
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
export const uploadImage = (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('No file received');
    error.httpStatusCode = 400;
    return next(error);
  }
  const productImage = new ProductImage({
    image: file.filename,
    thumbnail: file.filename,
    description: req.body.description,
    file_mime_type: file.mimetype,
  });
  productImage.save((err, productImage) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(productImage);
    }
  });
};

export const updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('tags')
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

export const getProductTags = (req, res) => {
  ProductTag.find({ product: req.params.id }).exec((err, productTags) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(productTags);
    }
  });
};
export const getProductTag = (req, res) => {
  ProductTag.findById(req.params.id).exec((err, productTag) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(productTag);
    }
  });
};
export const createProductTag = async (req, res) => {
  const productTag = new ProductTag(req.body);
  productTag.save((err, productTag) => {
    if (err) {
      res.status(500).send(err);
    } else {
      Product.findByIdAndUpdate(
        req.params.id,
        { $push: { tags: productTag._id } },
        { new: true },
        (err, product) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(product);
          }
        }
      );
    }
  });
};
export const updateProductTag = (req, res) => {
  ProductTag.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, productTag) => {
      if (err) {
        res.status(500).send(err);
      } else {
        Product.findByIdAndUpdate(
          req.params.id,
          { $push: { tags: productTag._id } },
          { new: true },
          (err, product) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send(product);
            }
          }
        );
      }
    }
  );
};
export const deleteProductTag = (req, res) => {
  ProductTag.findByIdAndRemove(req.params.id, (err, productTag) => {
    if (err) {
      res.status(500).send(err);
    } else {
      Product.findByIdAndUpdate(
        req.params.id,
        { $pull: { tags: productTag._id } },
        { new: true },
        (err, product) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(product);
          }
        }
      );
    }
  });
};
