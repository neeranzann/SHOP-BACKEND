const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const productSchema = mongoose.Schema({

  product_name: {
    type: String,
    required: true
  },
  product_detail: {
    type: String,
    required: true,
  },

  reviews: [reviewSchema],

  product_price: {
    type: Number,
    required: true
  },

  rating: {
    type: Number,
    default: 0
  },

  numReviews: {
    type: Number,
    default: 0
  },

  product_image: {
    type: String,
    required: true
  },

  brand: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  countInStock: {
    type: Number,
    required: true
  }

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
















