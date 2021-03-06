import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const ProductImageSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  file_mime_type: {
    type: String,
    required: true,
  },
});
export default mongoose.model('ProductImage', ProductImageSchema);
