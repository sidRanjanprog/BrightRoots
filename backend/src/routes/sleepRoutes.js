const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createSleep,
  getSleepRecords,
  updateSleep,
  deleteSleep,
} = require("../controllers/sleepController");

router.post("/", protect, createSleep);
router.get("/:childId", protect, getSleepRecords);
router.put("/:id", protect, updateSleep);
router.delete("/:id", protect, deleteSleep);

module.exports = router;