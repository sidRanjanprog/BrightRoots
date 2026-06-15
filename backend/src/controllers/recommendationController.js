const Child = require("../models/Child");
const ScreenTime = require("../models/ScreenTime");
const Sleep = require("../models/Sleep");
const OutdoorActivity = require("../models/OutdoorActivity");

const {
  generateRecommendations,
} = require("../services/recommendationService");

const getRecommendations = async (req, res) => {
  try {
    const child = await Child.findOne({
      _id: req.params.childId,
      parent: req.user.userId,
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    const screenTimes = await ScreenTime.find({
      child: child._id,
    });

    const sleepRecords = await Sleep.find({
      child: child._id,
    });

    const outdoorActivities = await OutdoorActivity.find({
      child: child._id,
    });

    const totalScreenTime = screenTimes.reduce(
      (sum, item) => sum + item.durationMinutes,
      0
    );

    const avgSleep =
      sleepRecords.length > 0
        ? sleepRecords.reduce(
            (sum, item) => sum + item.sleepHours,
            0
          ) / sleepRecords.length
        : 0;

    const totalOutdoorTime = outdoorActivities.reduce(
      (sum, item) => sum + item.durationMinutes,
      0
    );

    const recommendations =
      generateRecommendations({
        screenTimeMinutes: totalScreenTime,
        sleepHours: avgSleep,
        outdoorMinutes: totalOutdoorTime,
      });

    res.status(200).json({
      success: true,
      child: child.name,
      metrics: {
        totalScreenTime,
        avgSleep,
        totalOutdoorTime,
      },
      recommendations,
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
  getRecommendations,
};