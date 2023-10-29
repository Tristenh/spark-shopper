const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Order = require("./Order");

// create schema for User model
const userSchema = new Schema({
  // define username with constraints
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },

  // define email with constraints and email validation
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  orders: [Order.schema],

  wishList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// export User model
const User = model("User", userSchema);
module.exports = User;
