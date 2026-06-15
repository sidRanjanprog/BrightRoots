const mongoose = require("mongoose");

const sleepSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    sleepHours: {
      type: Number,
      required: true,
      min: 0,
    },

    sleepQuality: {
      type: String,
      enum: ["Poor", "Average", "Good"],
      default: "Average",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Sleep",
  sleepSchema
);