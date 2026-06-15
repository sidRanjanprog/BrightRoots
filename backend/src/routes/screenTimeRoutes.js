const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createScreenTime,
} = require("../controllers/screenTimeController");

router.post("/", protect, createScreenTime);

module.exports = router;