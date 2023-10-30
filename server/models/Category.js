const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  // define name with constraints
  name: {
    type: String,
    required: true,
    trim: true,
  },
});
//creates index for search
categorySchema.index({
  name: "text",
});
// export the Category model
const Category = model("Category", categorySchema);
module.exports = Category;
