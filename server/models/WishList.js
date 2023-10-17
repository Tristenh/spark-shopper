const { Schema, model } = require("mongoose");
const wishListSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  // define products as an array that references the Product model
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
// export the Order model
const WishList = model("WishList", wishListSchema);
module.exports = WishList;
