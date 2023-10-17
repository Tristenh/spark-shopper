const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
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
    required: true,
    default: Date.now(),
  },

  // define user, that references the User model
  users: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// export the Comment model
const Comment = model("Comment", commentSchema);
module.exports = Comment;
