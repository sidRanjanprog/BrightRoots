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

    const avgScreenTime =
      screenTimes.length > 0
        ? screenTimes.reduce((sum, item) => sum + item.durationMinutes, 0) /
          screenTimes.length
        : 0;

    const avgSleep =
      sleepRecords.length > 0
        ? sleepRecords.reduce((sum, item) => sum + item.sleepHours, 0) /
          sleepRecords.length
        : 0;

    const avgOutdoorTime =
      outdoorActivities.length > 0
        ? outdoorActivities.reduce(
            (sum, item) => sum + item.durationMinutes,
            0,
          ) / outdoorActivities.length
        : 0;

    const analysis = generateRecommendations({
      screenTimeMinutes: avgScreenTime,
      sleepHours: avgSleep,
      outdoorMinutes: avgOutdoorTime,

      hasScreenData: screenTimes.length > 0,

      hasSleepData: sleepRecords.length > 0,

      hasOutdoorData: outdoorActivities.length > 0,
    });

    res.status(200).json({
      success: true,
      child: child.name,

      metrics: {
        avgScreenTime,
        avgSleep,
        avgOutdoorTime,
      },

      wellnessScore: analysis.wellnessScore,

      riskLevel: analysis.riskLevel,

      dataWarnings: analysis.dataWarnings,

      recommendations: analysis.recommendations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getDashboardInsights = async (req, res) => {
  try {
    const children = await Child.find({
      parent: req.user.userId,
    });

    if (children.length === 0) {
      return res.status(200).json({
        success: true,
        totalChildren: 0,
        averageWellnessScore: 0,
        averageScreenTime: 0,
        averageSleep: 0,
        averageOutdoorTime: 0,
        highestRiskChild: null,
      });
    }

    let totalWellnessScore = 0;
    let totalScreenTime = 0;
    let totalSleep = 0;
    let totalOutdoorTime = 0;

    let highestRiskChild = null;
    let highestRiskLevel = -1;

    for (const child of children) {
      const screenTimes = await ScreenTime.find({
        child: child._id,
      });

      const sleepRecords = await Sleep.find({
        child: child._id,
      });

      const outdoorActivities = await OutdoorActivity.find({
        child: child._id,
      });

      const avgScreenTime =
        screenTimes.length > 0
          ? screenTimes.reduce((sum, item) => sum + item.durationMinutes, 0) /
            screenTimes.length
          : 0;

      const avgSleep =
        sleepRecords.length > 0
          ? sleepRecords.reduce((sum, item) => sum + item.sleepHours, 0) /
            sleepRecords.length
          : 0;

      const avgOutdoorTime =
        outdoorActivities.length > 0
          ? outdoorActivities.reduce(
              (sum, item) => sum + item.durationMinutes,
              0,
            ) / outdoorActivities.length
          : 0;

      const analysis = generateRecommendations({
        screenTimeMinutes: avgScreenTime,

        sleepHours: avgSleep,

        outdoorMinutes: avgOutdoorTime,

        hasScreenData: screenTimes.length > 0,

        hasSleepData: sleepRecords.length > 0,

        hasOutdoorData: outdoorActivities.length > 0,
      });

      totalWellnessScore += analysis.wellnessScore;

      totalScreenTime += avgScreenTime;

      totalSleep += avgSleep;

      totalOutdoorTime += avgOutdoorTime;

      const riskMap = {
        Low: 1,
        Medium: 2,
        High: 3,
      };

      if (riskMap[analysis.riskLevel] > highestRiskLevel) {
        highestRiskLevel = riskMap[analysis.riskLevel];

        highestRiskChild = child.name;
      }
    }

    res.status(200).json({
      success: true,

      totalChildren: children.length,

      averageWellnessScore: (totalWellnessScore / children.length).toFixed(1),

      averageScreenTime: (totalScreenTime / children.length).toFixed(1),

      averageSleep: (totalSleep / children.length).toFixed(1),

      averageOutdoorTime: (totalOutdoorTime / children.length).toFixed(1),

      highestRiskChild,
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
  getDashboardInsights,
};
