const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

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
  features: {
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
  // reference SubCategory model
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  comments:[
    {
      rating: {
        type: Number,
        required: true,
        trim: true,
        min: 1,
        max: 5,
      },
      // define name with constraints
      commentDesc: {
        type: String,
        trim: true,
      },
      //   get current date
      dateCreated: {
        type: Date,
        default: Date.now(),
        get: (timestamp) => dateFormat(timestamp),
      },
      userName:{
        type: String,
        required: true,
      }
    }
  ]
  // reference Comments model
  // comments: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Comment",
  // },
});
//creates index for search
productSchema.index({
  name: "text",
});
//creates index for search
productSchema.index({
  name: "text",
});

// export the Product model
const Product = model("Product", productSchema);
module.exports = Product;
