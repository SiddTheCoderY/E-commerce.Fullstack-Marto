import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: String,
    images: [String],
    price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  }, { timestamps: true });

export const Product = mongoose.model('products',productSchema)  