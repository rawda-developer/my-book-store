import ProductImage from '../models/ProductImage';
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
      res.json(productImage);
    }
  });
};
