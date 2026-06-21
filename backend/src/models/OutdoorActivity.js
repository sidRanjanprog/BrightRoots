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
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
      max: 1440,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("OutdoorActivity", outdoorActivitySchema);
