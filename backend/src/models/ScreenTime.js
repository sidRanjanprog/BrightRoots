const mongoose = require("mongoose");

const screenTimeSchema = new mongoose.Schema(
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

    durationMinutes: {
      type: Number,
      required: true,
      min: 0,
    },

    activityType: {
      type: String,
      enum: [
        "Educational",
        "Entertainment",
        "Gaming",
        "Social Media",
        "Other",
      ],
      default: "Other",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ScreenTime",
  screenTimeSchema
);