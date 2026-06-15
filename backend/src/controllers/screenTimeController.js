const ScreenTime = require("../models/ScreenTime");
const Child = require("../models/Child");

const createScreenTime = async (req, res) => {
  try {
    const {
      childId,
      date,
      durationMinutes,
      activityType,
    } = req.body;

    const child = await Child.findOne({
      _id: childId,
      parent: req.user.userId,
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    const screenTime = await ScreenTime.create({
      child: childId,
      date,
      durationMinutes,
      activityType,
    });

    res.status(201).json({
      success: true,
      message: "Screen time entry created",
      screenTime,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createScreenTime,
};