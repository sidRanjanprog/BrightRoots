const OutdoorActivity = require("../models/OutdoorActivity");
const Child = require("../models/Child");

const createOutdoorActivity = async (req, res) => {
  try {
    const { childId, date, activityType, durationMinutes } = req.body;

    const selectedDate = new Date(date);
    const today = new Date();

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    if (selectedDate > today) {
      return res.status(400).json({
        success: false,
        message: "Future dates are not allowed",
      });
    }

    if (
      selectedDate.getFullYear() < 2000 ||
      selectedDate.getFullYear() > today.getFullYear()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid year",
      });
    }

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

    const activity = await OutdoorActivity.create({
      child: childId,
      date,
      activityType,
      durationMinutes,
    });

    res.status(201).json({
      success: true,
      message: "Outdoor activity created",
      activity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getOutdoorActivities = async (req, res) => {
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

    const activities = await OutdoorActivity.find({
      child: req.params.childId,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateOutdoorActivity = async (req, res) => {
  try {
    const activity = await OutdoorActivity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    const child = await Child.findOne({
      _id: activity.child,
      parent: req.user.userId,
    });

    if (!child) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    activity.activityType = req.body.activityType || activity.activityType;

    activity.durationMinutes =
      req.body.durationMinutes || activity.durationMinutes;

    if (req.body.date) {
      const selectedDate = new Date(req.body.date);

      const today = new Date();

      if (isNaN(selectedDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date",
        });
      }

      if (selectedDate > today) {
        return res.status(400).json({
          success: false,
          message: "Future dates are not allowed",
        });
      }

      if (
        selectedDate.getFullYear() < 2000 ||
        selectedDate.getFullYear() > today.getFullYear()
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid year",
        });
      }
    }

    activity.date = req.body.date || activity.date;

    await activity.save();

    res.status(200).json({
      success: true,
      message: "Activity updated successfully",
      activity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteOutdoorActivity = async (req, res) => {
  try {
    const activity = await OutdoorActivity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    const child = await Child.findOne({
      _id: activity.child,
      parent: req.user.userId,
    });

    if (!child) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await OutdoorActivity.deleteOne({
      _id: req.params.id,
    });

    res.status(200).json({
      success: true,
      message: "Activity deleted successfully",
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
  createOutdoorActivity,
  getOutdoorActivities,
  updateOutdoorActivity,
  deleteOutdoorActivity,
};
