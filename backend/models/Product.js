import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  date_updated: {
    type: Date,
    default: Date.now,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductTag',
    },
  ],
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductImage',
    },
  ],
});
export default mongoose.model('Product', ProductSchema);
