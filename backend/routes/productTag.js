import Product from '../models/Product';
import ProductTag from '../models/ProductTag';

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
