const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createOutdoorActivity,
  getOutdoorActivities,
  updateOutdoorActivity,
  deleteOutdoorActivity,
} = require("../controllers/outdoorActivityController");

router.post("/", protect, createOutdoorActivity);
router.get("/:childId", protect, getOutdoorActivities);
router.put("/:id", protect, updateOutdoorActivity);
router.delete("/:id", protect, deleteOutdoorActivity);

module.exports = router;
