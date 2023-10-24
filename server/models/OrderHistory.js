const { Schema, model } = require("mongoose");
const OrderHistorySchema = new Schema({
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
// export the OrderHistory model
const OrderHistory = model("OrderHistory", OrderHistorySchema);
module.exports = OrderHistory;
