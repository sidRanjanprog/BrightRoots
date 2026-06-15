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

const getScreenTimes = async (req, res) => {
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
        child: req.params.childId,
      }).sort({ date: -1 });
  
      res.status(200).json({
        success: true,
        count: screenTimes.length,
        screenTimes,
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

  const updateScreenTime = async (req, res) => {
    try {
      const screenTime = await ScreenTime.findById(req.params.id);
  
      if (!screenTime) {
        return res.status(404).json({
          success: false,
          message: "Screen time entry not found",
        });
      }
  
      const child = await Child.findOne({
        _id: screenTime.child,
        parent: req.user.userId,
      });
  
      if (!child) {
        return res.status(403).json({
          success: false,
          message: "Not authorized",
        });
      }
  
      screenTime.durationMinutes =
        req.body.durationMinutes || screenTime.durationMinutes;
  
      screenTime.activityType =
        req.body.activityType || screenTime.activityType;
  
      screenTime.date =
        req.body.date || screenTime.date;
  
      await screenTime.save();
  
      res.status(200).json({
        success: true,
        message: "Screen time updated successfully",
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

  const deleteScreenTime = async (req, res) => {
    try {
      const screenTime = await ScreenTime.findById(req.params.id);
  
      if (!screenTime) {
        return res.status(404).json({
          success: false,
          message: "Screen time entry not found",
        });
      }
  
      const child = await Child.findOne({
        _id: screenTime.child,
        parent: req.user.userId,
      });
  
      if (!child) {
        return res.status(403).json({
          success: false,
          message: "Not authorized",
        });
      }
  
      await ScreenTime.deleteOne({
        _id: req.params.id,
      });
  
      res.status(200).json({
        success: true,
        message: "Screen time entry deleted successfully",
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
  getScreenTimes,
  updateScreenTime,
  deleteScreenTime,
};