const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    age: {
      type: Number,
      required: true,
      min: 1,
      max: 18,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Child", childSchema);
