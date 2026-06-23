const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createScreenTime,
  getScreenTimes,
  updateScreenTime,
  deleteScreenTime,
} = require("../controllers/screenTimeController");

router.post("/", protect, createScreenTime);
router.get("/:childId", protect, getScreenTimes);
router.put("/:id", protect, updateScreenTime);
router.delete("/:id", protect, deleteScreenTime);

module.exports = router;
