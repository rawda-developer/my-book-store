import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const ProductTagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});
export default mongoose.model('ProductTag', ProductTagSchema);
