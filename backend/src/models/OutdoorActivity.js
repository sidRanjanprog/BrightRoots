const mongoose = require("mongoose");

const outdoorActivitySchema = new mongoose.Schema(
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

    activityType: {
      type: String,
      required: true,
    },

    durationMinutes: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "OutdoorActivity",
  outdoorActivitySchema
);