const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  // define values with constraints
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  },
  // reference Category model
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  // reference Comments model
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
  },
});

// export the Product model
const Product = model("Product", productSchema);
module.exports = Product;
