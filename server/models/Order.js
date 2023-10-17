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
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});
// export the Order model
const Order = model("Order", orderSchema);
module.exports = Order;
