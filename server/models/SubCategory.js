const { Schema, model } = require("mongoose");
const subCategorySchema = new Schema({
  // define values with constraints
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // reference Category model
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});
// export the SubCategory model
const SubCategory = model("SubCategory", subCategorySchema);
module.exports = SubCategory;
