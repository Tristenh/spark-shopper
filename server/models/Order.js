const { Schema, model } = require("mongoose");
const orderSchema = new Schema({
  // gets current date
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  // define products as an array that references the Product model and quantity feild
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  orderHistory:{
    type: Schema.Types.ObjectId,
    ref: "orderHistory",
  },
});
// export the Order model
const Order = model("Order", orderSchema);
module.exports = Order;
