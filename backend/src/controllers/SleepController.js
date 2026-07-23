const Sleep = require("../models/Sleep");
const Child = require("../models/Child");

const createSleep = async (req, res) => {
  try {
    const { childId, date, sleepHours, sleepQuality } = req.body;

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

    const hours = Number(sleepHours);

    if (hours <= 0 || hours > 24) {
      return res.status(400).json({
        success: false,
        message: "Sleep duration must be greater than 0 and cannot exceed 24 hours.",
      });
    }

    const sleep = await Sleep.create({
      child: childId,
      date,
      sleepHours: hours,
      sleepQuality,
    });

    res.status(201).json({
      success: true,
      message: "Sleep entry created",
      sleep,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getSleepRecords = async (req, res) => {
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

    const sleepRecords = await Sleep.find({
      child: req.params.childId,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: sleepRecords.length,
      sleepRecords,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateSleep = async (req, res) => {
  try {
    const sleep = await Sleep.findById(req.params.id);

    if (!sleep) {
      return res.status(404).json({
        success: false,
        message: "Sleep record not found",
      });
    }

    const child = await Child.findOne({
      _id: sleep.child,
      parent: req.user.userId,
    });

    if (!child) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (req.body.date !== undefined) {
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

      if (selectedDate.getFullYear() < 2000 || selectedDate.getFullYear() > today.getFullYear()) {
        return res.status(400).json({
          success: false,
          message: "Invalid year",
        });
      }
    }

    if (req.body.sleepHours !== undefined) {
      const hours = Number(req.body.sleepHours);

      if (hours <= 0 || hours > 24) {
        return res.status(400).json({
          success: false,
          message: "Sleep duration must be greater than 0 and cannot exceed 24 hours.",
        });
      }
    }

    sleep.sleepHours =
      req.body.sleepHours !== undefined ? Number(req.body.sleepHours) : sleep.sleepHours;

    sleep.sleepQuality = req.body.sleepQuality ?? sleep.sleepQuality;

    sleep.date = req.body.date ?? sleep.date;

    await sleep.save();

    res.status(200).json({
      success: true,
      message: "Sleep record updated successfully",
      sleep,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteSleep = async (req, res) => {
  try {
    const sleep = await Sleep.findById(req.params.id);

    if (!sleep) {
      return res.status(404).json({
        success: false,
        message: "Sleep record not found",
      });
    }

    const child = await Child.findOne({
      _id: sleep.child,
      parent: req.user.userId,
    });

    if (!child) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Sleep.deleteOne({
      _id: req.params.id,
    });

    res.status(200).json({
      success: true,
      message: "Sleep record deleted successfully",
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
  createSleep,
  getSleepRecords,
  updateSleep,
  deleteSleep,
};
