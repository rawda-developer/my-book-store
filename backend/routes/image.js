import ProductImage from '../models/ProductImage';
import Product from '../models/Product';
import ImageResizer from '../utils/ImageResizer';
import path from 'path';

export const uploadImage = async (req, res, next) => {
  const origImage = req.file;
  console.log(origImage);
  if (!origImage) {
    const error = new Error('No file received');
    error.httpStatusCode = 400;
    return next(error);
  }
  const thumbnailsFolder = path.join(__dirname, '../thumbnails');
  const resizer = new ImageResizer(thumbnailsFolder);
  console.log('buffer', origImage.path);
  const thumbnail = await resizer.save(origImage.path);
  const productImage = new ProductImage({
    image: origImage.filename,
    thumbnail: thumbnail,
    file_mime_type: origImage.mimetype,
  });
  productImage.save((err, productImage) => {
    if (err) {
      res.status(500).send(err);
    } else {
      Product.findByIdAndUpdate(
        req.params.id,
        { $push: { images: productImage._id } },
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

export const getImage = async (req, res, next) => {
  const productImage = await ProductImage.findById(req.params.id);
  if (!productImage) {
    const error = new Error('No image found');
    error.httpStatusCode = 404;
    return next(error);
  }
  res.sendFile(path.join(__dirname, '../thumbnails', productImage.thumbnail));
};

export const getProductImages = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    const error = new Error('No product found');
    error.httpStatusCode = 404;
    return next(error);
  }
  const productImages = await ProductImage.find({
    _id: { $in: product.images },
  });
  res.send(productImages);
};
